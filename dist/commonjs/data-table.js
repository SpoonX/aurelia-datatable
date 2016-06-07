'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

var _aureliaFramework = require('aurelia-framework');

var _aureliaViewManager = require('aurelia-view-manager');

var _aureliaRouter = require('aurelia-router');

var _jsonStatham = require('json-statham');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var DataTable = exports.DataTable = (_dec = (0, _aureliaFramework.customElement)('data-table'), _dec2 = (0, _aureliaViewManager.resolvedView)('aurelia-data-table', 'dataTable'), _dec3 = (0, _aureliaFramework.inject)(_aureliaRouter.Router, Element), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec5 = (0, _aureliaFramework.computedFrom)('columns'), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
  function DataTable(Router, element, eventAggregator) {
    _classCallCheck(this, DataTable);

    _initDefineProp(this, 'criteria', _descriptor, this);

    _initDefineProp(this, 'repository', _descriptor2, this);

    _initDefineProp(this, 'columns', _descriptor3, this);

    _initDefineProp(this, 'defaultColumn', _descriptor4, this);

    _initDefineProp(this, 'searchable', _descriptor5, this);

    _initDefineProp(this, 'sortable', _descriptor6, this);

    _initDefineProp(this, 'update', _descriptor7, this);

    _initDefineProp(this, 'destroy', _descriptor8, this);

    _initDefineProp(this, 'showActions', _descriptor9, this);

    _initDefineProp(this, 'select', _descriptor10, this);

    _initDefineProp(this, 'data', _descriptor11, this);

    _initDefineProp(this, 'route', _descriptor12, this);

    this.count = 0;
    this.columnsArray = [];
    this.sortingCriteria = {};
    this.searchCriteria = {};

    this.router = Router;
    this.element = element;
  }

  DataTable.prototype.attached = function attached() {
    this.load();
  };

  DataTable.prototype.load = function load() {
    var _this = this;

    this.criteria = this.buildCriteria();

    if (!this.repository) {
      this.showActions = false;
      return;
    }

    this.repository.find(this.criteria, true).then(function (result) {
      _this.data = result;
    }).catch(function (error) {
      console.error('Something went wrong.', error);
    });
  };

  DataTable.prototype.buildCriteria = function buildCriteria() {
    var crit = {};

    if (this.searchable !== null && Object.keys(this.searchCriteria).length) {
      var propertyName = Object.keys(this.searchCriteria)[0];
      if (this.searchCriteria[propertyName]) {
        crit['where'] = {};
        crit['where'][propertyName] = {};
        crit['where'][propertyName]['contains'] = this.searchCriteria[propertyName];
      }
    }

    if (this.sortable !== null && Object.keys(this.sortingCriteria).length) {
      var _propertyName = Object.keys(this.sortingCriteria)[0];
      if (this.sortingCriteria[_propertyName]) {
        crit['sort'] = _propertyName + ' ' + this.sortingCriteria[_propertyName];
      }
    }

    return crit;
  };

  DataTable.prototype.populate = function populate(row) {
    return this.repository.getPopulatedEntity(row);
  };

  DataTable.prototype.doDelete = function doDelete(row) {
    var _this2 = this;

    if (typeof this.delete === 'function') {
      return this.delete(this.populate(row));
    }

    this.populate(row).destroy().then(function (ah) {
      _this2.load();
      _this2.triggerEvent('deleted', row);
    }).catch(function (error) {
      _this2.triggerEvent('exception', { on: 'delete', error: error });
    });
  };

  DataTable.prototype.doUpdate = function doUpdate(row) {
    var _this3 = this;

    if (typeof this.update === 'function') {
      return this.update(this.populate(row));
    }

    this.populate(row).update().then(function () {
      _this3.load();
      _this3.triggerEvent('updated', row);
    }).catch(function (error) {
      _this3.triggerEvent('exception', { on: 'update', error: error });
    });
  };

  DataTable.prototype.doSort = function doSort(columnLabel) {
    if (this.sortable === null || this.isObject(columnLabel.column)) {
      return;
    }

    if (this.sortingCriteria[columnLabel.column]) {
      this.sortingCriteria[columnLabel.column] = this.sortingCriteria[columnLabel.column] === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortingCriteria = {};
      this.sortingCriteria[columnLabel.column] = 'asc';
    }

    this.load();
  };

  DataTable.prototype.doSearch = function doSearch(searchInput) {
    if (this.searchable === null) {
      return;
    }

    if (!(this.defaultColumn in this.searchCriteria)) {
      this.searchCriteria = {};
    }

    this.searchCriteria[this.defaultColumn] = searchInput;

    this.load();
  };

  DataTable.prototype.checkDefaultColumn = function checkDefaultColumn() {
    var hasNameColumn = this.columnsArray.indexOf('name') !== -1;

    if (!this.defaultColumn || this.defaultColumn && this.columnsArray.indexOf(this.defaultColumn) === -1) {
      this.defaultColumn = hasNameColumn ? 'name' : this.columnsArray[0] || null;
    }
  };

  DataTable.prototype.triggerEvent = function triggerEvent(event) {
    var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    payload.bubbles = true;
    return this.element.dispatchEvent(new CustomEvent(event, payload));
  };

  DataTable.prototype.destroyRow = function destroyRow(id) {
    return this.element.dispatchEvent(new CustomEvent('destroyed', this.data.asObject()));
  };

  DataTable.prototype.populate = function populate(row) {
    return this.repository.getPopulatedEntity(row);
  };

  DataTable.prototype.selected = function selected(row) {
    if (this.select) {
      return this.select(this.repository.getPopulatedEntity(row));
    }

    return this.navigateTo(row.id);
  };

  DataTable.prototype.navigateTo = function navigateTo(id) {
    this.router.navigateToRoute(this.route, { id: id });
  };

  DataTable.prototype.displayValue = function displayValue(row, propertyName) {
    if (row[propertyName]) {
      return row[propertyName];
    }
    var statham = new _jsonStatham.Statham(row, _jsonStatham.Statham.MODE_NESTED);
    return statham.fetch(propertyName);
  };

  DataTable.prototype.isObject = function isObject(columnName) {
    return columnName.indexOf('.') !== -1;
  };

  _createClass(DataTable, [{
    key: 'columnLabels',
    get: function get() {
      var instance = this,
          labelsRaw = instance.columns.split(','),
          labels = [];

      function clean(str) {
        return str.replace(/^'?\s*|\s*'$/g, '');
      }

      function ucfirst(str) {
        return str[0].toUpperCase() + str.substr(1);
      }

      labelsRaw.forEach(function (label) {
        if (!label) {
          return;
        }
        var aliased = label.split(' as '),
            cleanedLabel = clean(aliased[0]);

        if (instance.columnsArray.indexOf(cleanedLabel) === -1) {
          instance.columnsArray.push(cleanedLabel);
        }

        labels.push({
          column: cleanedLabel,
          label: ucfirst(clean(aliased[1] || aliased[0]))
        });
      });

      this.checkDefaultColumn();

      return labels;
    }
  }]);

  return DataTable;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'repository', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'columns', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'defaultColumn', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'searchable', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'sortable', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'update', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'destroy', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'showActions', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'select', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'data', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'route', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'columnLabels', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'columnLabels'), _class2.prototype)), _class2)) || _class) || _class) || _class);