"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTable = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18;

var _aureliaFramework = require("aurelia-framework");

var _aureliaViewManager = require("aurelia-view-manager");

var _aureliaOrm = require("aurelia-orm");

var _aureliaRouter = require("aurelia-router");

var _jsonStatham = require("json-statham");

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

var DataTable = exports.DataTable = (_dec = (0, _aureliaFramework.customElement)('datatable'), _dec2 = (0, _aureliaViewManager.resolvedView)('spoonx/datatable', 'datatable'), _dec3 = (0, _aureliaFramework.inject)(_aureliaRouter.Router, Element, _aureliaOrm.EntityManager), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec5 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec6 = (0, _aureliaFramework.computedFrom)('columns'), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
  function DataTable(Router, element, entityManager) {
    _classCallCheck(this, DataTable);

    _initDefineProp(this, "criteria", _descriptor, this);

    _initDefineProp(this, "where", _descriptor2, this);

    _initDefineProp(this, "limit", _descriptor3, this);

    _initDefineProp(this, "columns", _descriptor4, this);

    _initDefineProp(this, "searchColumn", _descriptor5, this);

    _initDefineProp(this, "searchable", _descriptor6, this);

    _initDefineProp(this, "sortable", _descriptor7, this);

    _initDefineProp(this, "edit", _descriptor8, this);

    _initDefineProp(this, "destroy", _descriptor9, this);

    _initDefineProp(this, "page", _descriptor10, this);

    _initDefineProp(this, "populate", _descriptor11, this);

    _initDefineProp(this, "select", _descriptor12, this);

    _initDefineProp(this, "repository", _descriptor13, this);

    _initDefineProp(this, "resource", _descriptor14, this);

    _initDefineProp(this, "data", _descriptor15, this);

    _initDefineProp(this, "route", _descriptor16, this);

    _initDefineProp(this, "pages", _descriptor17, this);

    _initDefineProp(this, "actions", _descriptor18, this);

    this.router = Router;
    this.element = element;
    this.entityManager = entityManager;
  }

  DataTable.prototype.attached = function attached() {
    if (!this.repository && this.resource) {
      this.repository = this.entityManager.getRepository(this.resource);
    }

    this.ready = true;
    this.criteria.where = this.where || {};
    this.criteria.sort = this.criteria.sort || {};

    this.load();
  };

  DataTable.prototype.detached = function detached() {
    this.ready = false;
  };

  DataTable.prototype.pageChanged = function pageChanged() {
    this.load();
  };

  DataTable.prototype.limitChanged = function limitChanged() {
    this.load();
  };

  DataTable.prototype.load = function load() {
    var _this = this;

    this.criteria.skip = this.page * this.limit - this.limit;
    this.criteria.limit = this.limit;

    if (!this.populate) {
      this.criteria.populate = null;
    } else if (typeof this.populate === 'string') {
      this.criteria.populate = this.populate;
    }

    this.repository.find(this.criteria, true).then(function (result) {
      _this.data = result;
    }).catch(function (error) {
      _this.triggerEvent('exception', { on: 'load', error: error });
    });
  };

  DataTable.prototype.populateEntity = function populateEntity(row) {
    return this.repository.getPopulatedEntity(row);
  };

  DataTable.prototype.doDestroy = function doDestroy(row) {
    var _this2 = this;

    if (typeof this.destroy === 'function') {
      return this.destroy(row);
    }

    this.populateEntity(row).destroy().then(function () {
      _this2.load();
      _this2.triggerEvent('destroyed', row);
    }).catch(function (error) {
      _this2.triggerEvent('exception', { on: 'destroy', error: error });
    });
  };

  DataTable.prototype.doEdit = function doEdit(row) {
    if (typeof this.edit === 'function') {
      return this.edit(row);
    }
  };

  DataTable.prototype.doCustomAction = function doCustomAction(action, row) {
    if (typeof action.action === 'function') {
      return action.action(row);
    }
  };

  DataTable.prototype.checkDisabled = function checkDisabled(action, row) {
    if (typeof action.disabled === 'function') {
      return action.disabled(row);
    }
    return false;
  };

  DataTable.prototype.doSort = function doSort(columnLabel) {
    var _criteria$sort;

    if (this.sortable === null || columnLabel.column.indexOf('.') !== -1) {
      return;
    }

    var column = columnLabel.column;

    this.criteria.sort = (_criteria$sort = {}, _criteria$sort[column] = this.criteria.sort[column] === 'asc' ? 'desc' : 'asc', _criteria$sort);

    this.load();
  };

  DataTable.prototype.searchColumnChanged = function searchColumnChanged(newValue, oldValue) {
    if (!this.ready) {
      return;
    }

    delete this.criteria.where[oldValue];

    return this.doSearch();
  };

  DataTable.prototype.doSearch = function doSearch() {
    if (!this.ready) {
      return;
    }

    if (_typeof(this.criteria.where[this.searchColumn]) === 'object') {
      this.criteria.where[this.searchColumn].contains = this.search;
    } else {
      this.criteria.where[this.searchColumn] = { contains: this.search };
    }

    if (!this.ready) {
      return;
    }

    this.pager.reloadCount();

    this.load();
  };

  DataTable.prototype.reload = function reload() {
    this.pager.reloadCount();

    if (this.page === 1) {
      this.load();
    }
  };

  DataTable.prototype.triggerEvent = function triggerEvent(event) {
    var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    payload.bubbles = true;

    return this.element.dispatchEvent(new CustomEvent(event, payload));
  };

  DataTable.prototype.selected = function selected(row) {
    if (this.route) {
      return this.router.navigateToRoute(this.route, { id: row.id });
    }

    if (this.select) {
      return this.select(row);
    }
  };

  DataTable.prototype.displayValue = function displayValue(row, propertyName) {
    return new _jsonStatham.Statham(row, _jsonStatham.Statham.MODE_NESTED).fetch(propertyName);
  };

  _createClass(DataTable, [{
    key: "columnLabels",
    get: function get() {
      var labelsRaw = this.columns.split(',');
      var columnsArray = [];
      var labels = [];

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

        var aliased = label.split(' as ');
        var cleanedColumn = clean(aliased[0]);

        if (columnsArray.indexOf(cleanedColumn) === -1) {
          columnsArray.push(cleanedColumn);
        }

        labels.push({
          nested: cleanedColumn.indexOf('.') !== -1,
          column: cleanedColumn,
          label: ucfirst(clean(aliased[1] || aliased[0]))
        });
      });

      return labels;
    }
  }]);

  return DataTable;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "criteria", [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "where", [_dec5], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "limit", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 30;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "searchColumn", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'name';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "searchable", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sortable", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "edit", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "destroy", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "page", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "populate", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "select", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "repository", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "resource", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "data", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "route", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "pages", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "actions", [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "columnLabels", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "columnLabels"), _class2.prototype)), _class2)) || _class) || _class) || _class);