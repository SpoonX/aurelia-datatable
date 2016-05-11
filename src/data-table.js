import {bindable, inject, computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Statham} from 'json-statham';

@inject(Router, Element)
export class DataTable {
@bindable repository;

  @bindable data;

  @bindable route;

  @bindable columns;

  @bindable select;

  @bindable destroy = null;

  @bindable update = null;

  @bindable sortable = null;

  count = 0;
  sortingCriteria = {};

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

  attached () {
    return this.load();
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
      this.load();
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
      this.load();
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

  load () {
    let criteria = this.buildCriteria();
    this.repository.find(criteria, true).then(result => {
     this.data = result;
    })
    .catch(error => {
      console.error('Something went wrong.', error);
    });
  }

  buildCriteria() {
    let criteria = {};

    if (this.sortable !== null && Object.keys(this.sortingCriteria).length ) {
      let propertyName = Object.keys(this.sortingCriteria)[0];
      if (this.sortingCriteria[propertyName]) {
        criteria['sort'] = propertyName + ' ' + this.sortingCriteria[propertyName];
      }
    }
    return criteria;
  }

  doSort(columnLabel) {
    if (this.sortable === null || this.isObject(columnLabel.column)) {
      return;
    }

    if (this.sortingCriteria[columnLabel.column]) {
      this.sortingCriteria[columnLabel.column] = (this.sortingCriteria[columnLabel.column] === 'asc' ? 'desc' : 'asc');
    }
    else {
      this.sortingCriteria = {};
      this.sortingCriteria[columnLabel.column] = 'asc';
    }

    this.load();
  }

  displayValue (row, propertyName) {
    if (row[propertyName]) {
      return row[propertyName];
    }
    let statham = new Statham(row, Statham.MODE_NESTED);
    return statham.fetch(propertyName);
  }

  isObject (columnName) {
    return (columnName.indexOf('.') !== -1);
  }
}
