var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { inject } from 'aurelia-dependency-injection';
import { bindingMode, computedFrom } from 'aurelia-binding';
import { bindable, customElement } from 'aurelia-templating';
import { resolvedView } from 'aurelia-view-manager';
import { EntityManager } from 'aurelia-orm';
import { Router } from 'aurelia-router';
import { Homefront } from 'homefront';

export let DataTable = (_dec = customElement('datatable'), _dec2 = resolvedView('spoonx/datatable', 'datatable'), _dec3 = inject(Router, Element, EntityManager), _dec4 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec5 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec6 = computedFrom('columns'), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class DataTable {

  constructor(router, element, entityManager) {
    _initDefineProp(this, 'criteria', _descriptor, this);

    _initDefineProp(this, 'where', _descriptor2, this);

    _initDefineProp(this, 'limit', _descriptor3, this);

    _initDefineProp(this, 'columns', _descriptor4, this);

    _initDefineProp(this, 'searchColumn', _descriptor5, this);

    _initDefineProp(this, 'actions', _descriptor6, this);

    _initDefineProp(this, 'searchable', _descriptor7, this);

    _initDefineProp(this, 'sortable', _descriptor8, this);

    _initDefineProp(this, 'edit', _descriptor9, this);

    _initDefineProp(this, 'destroy', _descriptor10, this);

    _initDefineProp(this, 'page', _descriptor11, this);

    _initDefineProp(this, 'loadingIndicator', _descriptor12, this);

    _initDefineProp(this, 'populate', _descriptor13, this);

    _initDefineProp(this, 'select', _descriptor14, this);

    _initDefineProp(this, 'repository', _descriptor15, this);

    _initDefineProp(this, 'resource', _descriptor16, this);

    _initDefineProp(this, 'data', _descriptor17, this);

    _initDefineProp(this, 'route', _descriptor18, this);

    _initDefineProp(this, 'pages', _descriptor19, this);

    _initDefineProp(this, 'footer', _descriptor20, this);

    this.loading = false;
    this.hasVisibleActions = false;

    this.router = router;
    this.element = element;
    this.entityManager = entityManager;
  }

  attached() {
    if (!this.repository && this.resource) {
      this.repository = this.entityManager.getRepository(this.resource);
    }

    this.ready = true;
    this.criteria.where = this.where || {};
    this.criteria.sort = this.criteria.sort || {};

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
    this.loading = true;

    this.criteria.skip = this.page * this.limit - this.limit;
    this.criteria.limit = this.limit;

    if (!this.populate) {
      this.criteria.populate = null;
    } else if (typeof this.populate === 'string') {
      this.criteria.populate = this.populate;
    } else if (Array.isArray(this.populate)) {
      this.criteria.populate = this.populate.join(',');
    }

    this.repository.find(this.criteria, true).then(result => {
      this.loading = false;
      this.data = result;
    }).catch(error => {
      this.loading = false;
      this.triggerEvent('exception', { on: 'load', error: error });
    });
  }

  gatherData(criteria = {}) {
    return this.repository.find(criteria, true).catch(error => {
      this.triggerEvent('exception', { on: 'load', error: error });
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
      this.triggerEvent('exception', { on: 'destroy', error: error });
    });
  }

  doEdit(row) {
    if (typeof this.edit === 'function') {
      return this.edit(row);
    }
  }

  doCustomAction(action, row) {
    if (!action) {
      return false;
    }

    if (typeof action.action === 'function') {
      return action.action(row);
    }
  }

  checkDisabled(action, row) {
    if (!action) {
      return true;
    }

    if (typeof action.disabled === 'function') {
      return action.disabled(row);
    }

    return false;
  }

  checkVisibility(action, row) {
    if (!action) {
      return false;
    }

    if (typeof action.visible !== 'function') {
      this.hasVisibleActions = true;

      return true;
    }

    let isVisible = action.visible(row);

    if (isVisible) {
      this.hasVisibleActions = true;
    }

    return isVisible;
  }

  showActions() {
    return this.destroy !== null || this.edit !== null || this.actions.length > 0;
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
      this.criteria.where[this.searchColumn] = { contains: this.search };
    }

    if (!this.ready) {
      return;
    }

    this.pager.reloadCount();

    this.load();
  }

  reload() {
    this.pager.reloadCount();

    if (this.page === 1) {
      this.load();
    }

    this.page = 1;
  }

  get columnLabels() {
    function clean(str) {
      return str.replace(/^'?\s*|\s*'$/g, '');
    }

    function ucfirst(str) {
      return str[0].toUpperCase() + str.substr(1);
    }

    if (Array.isArray(this.columns)) {
      return this.columns.map(column => {
        return {
          nested: !this.isSortable(column.property),
          column: column.property,
          label: ucfirst(clean(column.label || column.property)),
          route: column.route || false,
          converter: column.valueConverters || false
        };
      });
    }

    let labelsRaw = this.columns.split(',');
    let columnsArray = [];
    let labels = [];

    labelsRaw.forEach(label => {
      if (!label) {
        return;
      }

      let converter = label.split(' | ');
      let aliased = converter[0].split(' as ');
      let cleanedColumn = clean(aliased[0]);

      if (columnsArray.indexOf(cleanedColumn) === -1) {
        columnsArray.push(cleanedColumn);
      }

      labels.push({
        nested: !this.isSortable(cleanedColumn),
        column: cleanedColumn,
        label: ucfirst(clean(aliased[1] || aliased[0])),
        converter: converter.length > 1 ? converter.slice(1).join(' | ') : false
      });
    });

    return labels;
  }

  triggerEvent(event, payload = {}) {
    payload.bubbles = true;

    return this.element.dispatchEvent(new CustomEvent(event, payload));
  }

  selected(row, columnOptions) {
    if (columnOptions.route) {
      let params = {};

      if (columnOptions.route.params) {
        Object.keys(columnOptions.route.params).forEach(param => {
          let property = columnOptions.route.params[param];

          params[param] = this.displayValue(row, property);
        });
      }

      return this.router.navigateToRoute(columnOptions.route.name, params);
    }

    if (this.route) {
      return this.router.navigateToRoute(this.route, { id: row.id });
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

    if (typeof this.populate !== 'string') {
      return this.populate.indexOf(column) === -1;
    }

    return this.populate.replace(' ', '').split(',').indexOf(column) === -1;
  }

  displayValue(row, propertyName) {
    return new Homefront(row, Homefront.MODE_NESTED).fetch(propertyName);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_dec4], {
  enumerable: true,
  initializer: function () {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'where', [_dec5], {
  enumerable: true,
  initializer: function () {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'limit', [bindable], {
  enumerable: true,
  initializer: function () {
    return 30;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'columns', [bindable], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'searchColumn', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'name';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'actions', [bindable], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'searchable', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'sortable', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'edit', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'destroy', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'page', [bindable], {
  enumerable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'loadingIndicator', [bindable], {
  enumerable: true,
  initializer: function () {
    return '<center>Loading...</center>';
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'populate', [bindable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'select', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'repository', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, 'resource', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, 'data', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, 'route', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, 'pages', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, 'footer', [bindable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'columnLabels', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'columnLabels'), _class2.prototype)), _class2)) || _class) || _class) || _class);