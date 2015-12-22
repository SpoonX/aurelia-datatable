'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

var _aureliaFramework = require('aurelia-framework');

var _aureliaRouter = require('aurelia-router');

var _aureliaTemplating = require('aurelia-templating');

var DataTable = (function () {
  var _instanceInitializers = {};
  var _instanceInitializers = {};

  _createDecoratedClass(DataTable, [{
    key: 'repository',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'data',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'route',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'limit',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return 20;
    },
    enumerable: true
  }, {
    key: 'columns',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'page',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'select',
    decorators: [_aureliaFramework.bindable],
    initializer: null,
    enumerable: true
  }, {
    key: 'destroy',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return null;
    },
    enumerable: true
  }, {
    key: 'update',
    decorators: [_aureliaFramework.bindable],
    initializer: function initializer() {
      return null;
    },
    enumerable: true
  }, {
    key: 'pageCount',
    decorators: [(0, _aureliaFramework.computedFrom)('count', 'limit')],
    get: function get() {
      return Math.ceil(this.count / this.limit);
    }
  }, {
    key: 'columnLabels',
    decorators: [(0, _aureliaFramework.computedFrom)('columns')],
    get: function get() {
      var labelsRaw = this.columns.split(','),
          labels = [];

      function clean(str) {
        return str.replace(/^'?\s*|\s*'$/g, '');
      }

      function ucfirst(str) {
        return str[0].toUpperCase() + str.substr(1);
      }

      labelsRaw.forEach(function (label) {
        var aliased = label.split(' as ');

        labels.push({
          column: clean(aliased[0]),
          label: ucfirst(clean(aliased[1] || aliased[0]))
        });
      });

      return labels;
    }
  }], null, _instanceInitializers);

  function DataTable(Router, element) {
    _classCallCheck(this, _DataTable);

    _defineDecoratedPropertyDescriptor(this, 'repository', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'data', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'route', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'limit', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'columns', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'page', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'select', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'destroy', _instanceInitializers);

    _defineDecoratedPropertyDescriptor(this, 'update', _instanceInitializers);

    this.count = 0;

    this.router = Router;
    this.element = element;
    console.info('knkdf,qs:hd');
  }

  _createDecoratedClass(DataTable, [{
    key: 'reload',
    value: function reload() {
      this.updateRecordCount();

      return this.load(this.page);
    }
  }, {
    key: 'setRowData',
    value: function setRowData(id, data) {
      for (var i in this.data) {
        if (id !== this.data[i].id) {
          continue;
        }

        Object.assign(this.data[i], data);

        break;
      }

      return this;
    }
  }, {
    key: 'attached',
    value: function attached() {
      this.updateRecordCount();

      return this.load();
    }
  }, {
    key: 'updateRecordCount',
    value: function updateRecordCount() {
      var _this = this;

      this.repository.count().then(function (res) {
        return _this.count = res.count;
      })['catch'](function (res) {
        return console.error(res);
      });
    }
  }, {
    key: 'navigateTo',
    value: function navigateTo(id) {
      this.router.navigateToRoute(this.route, { id: id });
    }
  }, {
    key: 'populate',
    value: function populate(row) {
      return this.repository.getPopulatedEntity(row);
    }
  }, {
    key: 'doDelete',
    value: function doDelete(row) {
      var _this2 = this;

      if (typeof this.destroy === 'function') {
        return this.destroy(this.populate(row));
      }

      this.populate(row).destroy().then(function () {
        _this2.reload();
        _this2.triggerEvent('destroyed', row);
      })['catch'](function (error) {
        _this2.triggerEvent('exception', {
          on: 'delete',
          error: error
        });
      });
    }
  }, {
    key: 'doUpdate',
    value: function doUpdate(row) {
      var _this3 = this;

      if (typeof this.update === 'function') {
        return this.update(this.populate(row));
      }

      this.populate(row).update().then(function () {
        _this3.reload();
        _this3.triggerEvent('updated', row);
      })['catch'](function (error) {
        _this3.triggerEvent('exception', { on: 'update', error: error });
      });
    }
  }, {
    key: 'selected',
    value: function selected(row) {
      if (this.select) {
        return this.select(this.repository.getPopulatedEntity(row));
      }

      return this.navigateTo(row.id);
    }
  }, {
    key: 'triggerEvent',
    value: function triggerEvent(event, payload) {
      return this.element.dispatchEvent(new CustomEvent(event, payload));
    }
  }, {
    key: 'loadPrevious',
    value: function loadPrevious() {
      this.load(this.page - 1);
    }
  }, {
    key: 'loadNext',
    value: function loadNext() {
      this.load(this.page + 1);
    }
  }, {
    key: 'load',
    value: function load(page) {
      var _this4 = this;

      if (page === 0) {
        return;
      }

      page = page || 1;

      if (this.pageCount && page > this.pageCount) {
        return;
      }

      var skip = (page - 1) * this.limit;

      this.repository.find({ skip: skip, limit: this.limit, populate: false }, true).then(function (result) {
        _this4.page = page;
        _this4.data = result;
      })['catch'](function (error) {
        console.error('Something went wrong.', error);
      });
    }
  }], null, _instanceInitializers);

  var _DataTable = DataTable;
  DataTable = (0, _aureliaFramework.inject)(_aureliaRouter.Router, Element)(DataTable) || DataTable;
  DataTable = (0, _aureliaTemplating.customElement)('data-table')(DataTable) || DataTable;
  return DataTable;
})();

exports.DataTable = DataTable;