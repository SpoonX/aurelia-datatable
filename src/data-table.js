import {bindable, inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

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

  @computedFrom('count', 'limit')
  get pageCount () {
    return Math.ceil(this.count / this.limit);
  }

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

  constructor (Router, element) {
    this.router  = Router;
    this.element = element;
  }

  reload () {
    this.updateRecordCount();

    return this.load(this.page);
  }

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

  attached () {
    this.updateRecordCount();

    return this.load();
  }

  updateRecordCount () {
    this.repository.count()
      .then(res => this.count = res.count)
  .catch(res => console.error(res));
  }

  navigateTo (id) {
    this.router.navigateToRoute(this.route, {id: id});
  }

  destroyRow (id) {
    return this.element.dispatchEvent(new CustomEvent('destroyed', this.data.asObject()));
  }

  populate (row) {
    return this.repository.getPopulatedEntity(row);
  }

  doDelete (row) {
    if (typeof this.delete === 'function') {
      return this.delete(this.populate(row));
    }

    this.populate(row).destroy()
      .then(() => {
      this.reload();
    this.triggerEvent('deleted', row);
  })
  .catch(error => {
      this.triggerEvent('exception', {on: 'delete', error: error});
  });
  }

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

  selected (row) {
    if (this.select) {
      return this.select(this.repository.getPopulatedEntity(row));
    }

    return this.navigateTo(row.id);
  }

  triggerEvent (event, payload) {
    return this.element.dispatchEvent(new CustomEvent(event, payload));
  }

  loadPrevious () {
    this.load(this.page - 1);
  }

  loadNext () {
    this.load(this.page + 1);
  }

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
