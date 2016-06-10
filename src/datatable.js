import {bindable, inject, computedFrom, customElement, bindingMode} from "aurelia-framework";
import {resolvedView} from "aurelia-view-manager";
import {EntityManager} from "aurelia-orm";
import {Router} from "aurelia-router";
import {Statham} from "json-statham";

@customElement('data-table')
@resolvedView('aurelia-data-table', 'datatable')
@inject(Router, Element, EntityManager)
export class DataTable {
  @bindable({defaultBindingMode: bindingMode.twoWay})
  criteria               = {populate: null};
  @bindable limit        = 30;
  @bindable columns      = '';
  @bindable searchColumn = 'name';
  @bindable searchable   = null; // Show the search field? (Optional attribute)
  @bindable sortable     = null; // Columns can be sorted? (Optional attribute)
  @bindable edit         = null; // Rows are editable? (Optional attribute)
  @bindable destroy      = null; // Rows are removable? (Optional attribute)
  @bindable where        = {};
  @bindable page         = 1;
  @bindable select;
  @bindable repository;
  @bindable data;
  @bindable route;
  @bindable pages;
  @bindable criteriaPager;

  constructor(Router, element, entityManager) {
    this.router  = Router;
    this.element = element;

    if (!this.repository && this.element.hasAttribute('resource')) {
      this.repository = entityManager.getRepository(this.element.getAttribute('resource'));
    }
  }

  attached() {
    this.criteria.where = this.where;

    this.load();
  }

  pageChanged() {
    this.load();
  }

  limitChanged() {
    this.load();
  }

  load() {
    this.criteria.skip  = this.page * this.limit - this.limit;
    this.criteria.limit = this.limit;

    this.repository.find(this.criteria, true).then(result => {
      this.data = result;
    }).catch(error => {
      this.triggerEvent('exception', {on: 'load', error: error});
    });
  }

  populate(row) {
    return this.repository.getPopulatedEntity(row);
  }

  doDestroy(row) {
    if (typeof this.destroy === 'function') {
      return this.destroy(row);
    }

    this.populate(row).destroy().then(() => {
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

  doSort(columnLabel) {
    if (this.sortable === null || columnLabel.column.indexOf('.') !== -1) {
      return;
    }

    let column = columnLabel.column;

    this.criteria.sort = {
      [column]: this.criteria.sort[column] === 'asc' ? 'desc' : 'asc'
    };

    this.load();
  }

  doSearch() {
    this.criteria.where[this.searchColumn] = {contains: this.search};

    this.load();
  }

  searchColumnChanged(newValue, oldValue) {
    delete this.criteria.where[oldValue];

    this.doSearch();
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

      let aliased      = label.split(' as ');
      let cleanedLabel = clean(aliased[0]);

      if (columnsArray.indexOf(cleanedLabel) === -1) {
        columnsArray.push(cleanedLabel);
      }

      labels.push({
        column: cleanedLabel,
        label : ucfirst(clean(aliased[1] || aliased[0]))
      });
    });

    return labels;
  }

  triggerEvent(event, payload = {}) {
    payload.bubbles = true;

    return this.element.dispatchEvent(new CustomEvent(event, payload));
  }

  selected(row) {
    return this.select ? this.select(row) : this.router.navigateToRoute(this.route, {id: row.id});
  }

  displayValue(row, propertyName) {
    return new Statham(row, Statham.MODE_NESTED).fetch(propertyName);
  }

  getCaretIcon(column) {
    let sorting = this.criteria.sort[column];

    return sorting ? (sorting === 'desc' ? 'fa-caret-down' : 'fa-caret-up') : 'fa-sort';
  }
}
