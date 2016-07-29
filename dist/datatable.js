import {bindable, inject, computedFrom, customElement, bindingMode} from 'aurelia-framework';
import {resolvedView} from 'aurelia-view-manager';
import {EntityManager} from 'aurelia-orm';
import {Router} from 'aurelia-router';

@customElement('datatable')
@resolvedView('spoonx/datatable', 'datatable')
@inject(Router, Element, EntityManager)
export class DataTable {
  @bindable({defaultBindingMode: bindingMode.twoWay})
  criteria = {};

  @bindable({defaultBindingMode: bindingMode.twoWay})
  where = {};

  @bindable limit        = 30;
  @bindable columns      = '';
  @bindable searchColumn = 'name';
  @bindable actions      = [];
  @bindable searchable   = null;  // Show the search field? (Optional attribute).
  @bindable sortable     = null;  // Columns can be sorted? (Optional attribute).
  @bindable edit         = null;  // Rows are editable? (Optional attribute).
  @bindable destroy      = null;  // Rows are removable? (Optional attribute).
  @bindable page         = 1;     // Current page.
  @bindable populate     = false; // Which columns to populate. True for all, string for specific.
  @bindable select;               // User provided callback, called upon clicking on a row.
  @bindable repository;
  @bindable resource;
  @bindable data;
  @bindable route;
  @bindable pages;

  constructor(router, element, entityManager) {
    this.router        = router;
    this.element       = element;
    this.entityManager = entityManager;
  }

  attached() {
    if (!this.repository && this.resource) {
      this.repository = this.entityManager.getRepository(this.resource);
    }

    this.ready          = true;
    this.criteria.where = this.where || {};
    this.criteria.sort  = this.criteria.sort || {};

    this.load();
  }

  detached() {
    this.ready = false;
  }

  pageChanged() {
    if (!this.ready) {
      return;
    }

    this.load();
  }

  limitChanged() {
    if (!this.ready) {
      return;
    }

    this.load();
  }

  load() {
    this.criteria.skip  = this.page * this.limit - this.limit;
    this.criteria.limit = this.limit;

    if (!this.populate) {
      this.criteria.populate = null;
    } else if (typeof this.populate === 'string') {
      this.criteria.populate = this.populate;
    }

    this.repository.find(this.criteria, true).then(result => {
      this.data = result;
    }).catch(error => {
      this.triggerEvent('exception', {on: 'load', error: error});
    });
  }

  populateEntity(row) {
    return this.repository.getPopulatedEntity(row);
  }

  doDestroy(row) {
    if (typeof this.destroy === 'function') {
      return this.destroy(row);
    }

    this.populateEntity(row).destroy().then(() => {
      this.load();
      this.triggerEvent('destroyed', row);
    }).catch(error => {
      this.triggerEvent('exception', {on: 'destroy', error: error});
    });
  }

  doEdit(row) {
    if (typeof this.edit === 'function') {
      return this.edit(row);
    }
  }

  doCustomAction(action, row) {
    if (typeof action.action === 'function') {
      return action.action(row);
    }
  }

  checkDisabled(action, row) {
    if (typeof action.disabled === 'function') {
      return action.disabled(row);
    }
    return false;
  }

  doSort(columnLabel) {
    let column = columnLabel.column;

    if (this.sortable === null || !this.isSortable(column)) {
      return;
    }

    this.criteria.sort = {
      [column]: this.criteria.sort[column] === 'asc' ? 'desc' : 'asc'
    };

    this.load();
  }

  searchColumnChanged(newValue, oldValue) {
    if (!this.ready) {
      return;
    }

    delete this.criteria.where[oldValue];

    return this.doSearch();
  }

  doSearch() {
    if (!this.ready) {
      return;
    }

    if (typeof this.criteria.where[this.searchColumn] === 'object') {
      this.criteria.where[this.searchColumn].contains = this.search;
    } else {
      this.criteria.where[this.searchColumn] = {contains: this.search};
    }

    if (!this.ready) {
      return;
    }

    this.pager.reloadCount();

    this.load();
  }

  reload() {
    this.pager.reloadCount(); // sets page to 1, and triggers this.pageChanged() (reload data).

    if (this.page === 1) {
      this.load(); // this.pageChanged() won't trigger if the current page is already page 1.
    }
  }

  @computedFrom('columns')
  get columnLabels() {
    let labelsRaw    = this.columns.split(',');
    let columnsArray = [];
    let labels       = [];

    function clean(str) {
      return str.replace(/^'?\s*|\s*'$/g, '');
    }

    function ucfirst(str) {
      return str[0].toUpperCase() + str.substr(1);
    }

    labelsRaw.forEach(label => {
      if (!label) {
        return;
      }

      let converter     = label.split(' | ');
      let aliased       = converter[0].split(' as ');
      let cleanedColumn = clean(aliased[0]);

      if (columnsArray.indexOf(cleanedColumn) === -1) {
        columnsArray.push(cleanedColumn);
      }

      labels.push({
        nested: !this.isSortable(cleanedColumn),
        column: cleanedColumn,
        label: ucfirst(clean(aliased[1] || aliased[0])),
        converter: (converter.length > 1) ? converter.slice(1).join(' | ') : false
      });
    });

    return labels;
  }

  triggerEvent(event, payload = {}) {
    payload.bubbles = true;

    return this.element.dispatchEvent(new CustomEvent(event, payload));
  }

  selected(row) {
    if (this.route) {
      return this.router.navigateToRoute(this.route, {id: row.id});
    }

    if (this.select) {
      return this.select(row);
    }
  }

  isSortable(column) {
    if (column.indexOf('.') > 0) {
      return false;
    }

    if (!this.populate) {
      return true;
    }

    return this.populate.replace(' ', '').split(',').indexOf(column) === -1;
  }

  displayValue(row, ...propertyName) {
    return fetchFrom(row, ...normalizeKey(...propertyName));
  }
}

/**
 * Used to normalize keys of mixed array and dot-separated string to a single array of undotted strings
 * @param  {string|Array<keys>} keys    (dot-separated) string(s) or array of keys
 * @param  {Array}              ...rest Rest of the arguments
 * @return {Array}              that    The key normalized to an array of strings
 */
function normalizeKey(key, ...rest) {
  /*
   * First, we split the arguments in key and rest
   * then, if key is an array, we need to normalize it as well
   * else it can be split into an array directly
   * if the rest was empty, we're done
   * if not we concat our normalized key with the normalized rest
   */
  let normalized = Array.isArray(key) ? normalizeKey(...key) : key.split('.');

  return rest.length === 0 ? normalized : normalized.concat(normalizeKey(...rest));
}


/**
 * Fetches value from (nested) object with a normalized key
 * @param  {Object}               data    The data to fetch data from
 * @param  {string|Array<string>} keys    string or array of keys
 * @param  {Array<string>}        ...rest Rest of the arguments
 * @return {any}                  that    The retrieved value from the data
 */
function fetchFrom(data, key, ...rest) {
  /*
   * data is the POJO of the current branch
   * [key,...rest] is the current normalized key,
   * thus key is the first key as string and ...rest the remainder of the key
   * if rest is empty, then data[key] is the data we want to fetch
   * else, we go down onw set on the branch (data[key]) and repeat with ...rest,
   * which will make the new key the first entry of ...rest
   * and the new rest the remainder of ...rest minus the key
   */
  return rest.length === 0 ? data[key] : fetchFrom(data[key], ...rest);
}
