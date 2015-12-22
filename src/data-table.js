import {bindable, inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {customElement} from 'aurelia-templating';

@customElement('data-table')
@inject(Router, Element)
export class DataTable {
  @bindable repository;

  @bindable data;

  @bindable route;

  @bindable limit = 20;

  @bindable columns;

  @bindable page;

  @bindable select;

  @bindable destroy = null;

  @bindable update = null;

  count = 0;

  /**
   * Calculate number of pages whenever 'count' or 'limit' is updated.
   *
   * @returns {number} page count
   */
  @computedFrom('count', 'limit')
  get pageCount () {
    return Math.ceil(this.count / this.limit);
  }

  /**
   * Create an array of labels whenever 'columns' is updated.
   *
   * @returns {Array}
   */
  @computedFrom('columns')
  get columnLabels () {
    let labelsRaw = this.columns.split(','),
        labels    = [];

    function clean (str) {
      return str.replace(/^'?\s*|\s*'$/g, '');
    }

    function ucfirst (str) {
      return str[0].toUpperCase() + str.substr(1);
    }

    labelsRaw.forEach(function (label) {
      let aliased = label.split(' as ');

      labels.push({
        column: clean(aliased[0]),
        label : ucfirst(clean(aliased[1] || aliased[0]))
      });
    });

    return labels;
  }

  /**
   * Create a new data-table element.
   *
   * @param {Router} Router
   * @param {Element} element
   */
  constructor (Router, element) {
    this.router  = Router;
    this.element = element;
  }

  /**
   * Reload the data for the data-table.
   */
  reload () {
    this.updateRecordCount();

    return this.load(this.page);
  }

  /**
   * Set row data into 'this'.
   *
   * @param id
   * @param data
   */
  setRowData (id, data) {
    for (let i in this.data) {
      if (id !== this.data[i].id) {
        continue;
      }

      Object.assign(this.data[i], data);

      break;
    }

    return this;
  }

  /**
   * Calls 'updateRecordCount()' and 'load() when the view is attached.
   */
  attached () {
    this.updateRecordCount();

    return this.load();
  }

  /**
   * Calls the repository count function and set it.
   */
  updateRecordCount () {
    this.repository.count()
      .then(res => this.count = res.count)
      .catch(res => console.error(res));
  }

  /**
   * Calls native router 'navigateToRoute()' function whenever 'selected()' is called.
   */
  navigateTo (id) {
    this.router.navigateToRoute(this.route, {id: id});
  }

  /**
   * Return populated entries.
   *
   * @param {Array} row
   * @returns {Array}
   */
  populate (row) {
    return this.repository.getPopulatedEntity(row);
  }

  /**
   * Delete a row of entries either using provided custom function or build-in one.
   *
   * @param {Array} row
   */
  doDelete (row) {
    if (typeof this.destroy === 'function') {
      return this.destroy(this.populate(row));
    }

    this.populate(row).destroy()
      .then(() => {
        this.reload();
        this.triggerEvent('destroyed', row);
      })
      .catch(error => {
        this.triggerEvent('exception', {
          on    : 'delete',
          error : error
        });
      });
  }

  /**
   * Update row of entries either using provided custom function or built-in one.
   *
   * @param {Array} row
   */
  doUpdate (row) {
    if (typeof this.update === 'function') {
      return this.update(this.populate(row));
    }

    this.populate(row).update()
      .then(() => {
        this.reload();
        this.triggerEvent('updated', row);
      })
      .catch(error => {
        this.triggerEvent('exception', {on: 'update', error: error});
      });
  }

  /**
   * Will change url.
   *
   * @param row
   */
  selected (row) {
    if (this.select) {
      return this.select(this.repository.getPopulatedEntity(row));
    }

    return this.navigateTo(row.id);
  }

  /**
   * Convenient function to dispatch event.
   *
   * @param {string} event
   * @param {Object|Array} payload
   * @returns {boolean}
   */
  triggerEvent (event, payload) {
    return this.element.dispatchEvent(new CustomEvent(event, payload));
  }

  /**
   * Load previous page.
   */
  loadPrevious () {
    this.load(this.page - 1);
  }

  /**
   * Load next page.
   */
  loadNext () {
    this.load(this.page + 1);
  }

  /**
   * Load a page
   *
   * @param {page} page number
   */
  load (page) {
    if (page === 0) {
      return;
    }

    page = page || 1;

    if (this.pageCount && page > this.pageCount) {
      return;
    }

    let skip = (page - 1) * this.limit;

    this.repository.find({skip: skip, limit: this.limit, populate: false}, true)
      .then(result => {
        this.page = page;
        this.data = result;
      })
      .catch(error => {
        console.error('Something went wrong.', error);
      });
  }
}
