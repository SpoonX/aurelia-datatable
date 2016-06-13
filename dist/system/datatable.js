"use strict";

System.register(["aurelia-framework", "aurelia-view-manager", "aurelia-orm", "aurelia-router", "json-statham"], function (_export, _context) {
  "use strict";

  var bindable, inject, computedFrom, customElement, bindingMode, resolvedView, EntityManager, Router, Statham, _createClass, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, DataTable;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
      customElement = _aureliaFramework.customElement;
      bindingMode = _aureliaFramework.bindingMode;
    }, function (_aureliaViewManager) {
      resolvedView = _aureliaViewManager.resolvedView;
    }, function (_aureliaOrm) {
      EntityManager = _aureliaOrm.EntityManager;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_jsonStatham) {
      Statham = _jsonStatham.Statham;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("DataTable", DataTable = (_dec = customElement('datatable'), _dec2 = resolvedView('spoonx/datatable', 'datatable'), _dec3 = inject(Router, Element, EntityManager), _dec4 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec5 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec6 = computedFrom('columns'), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function () {
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

          _initDefineProp(this, "select", _descriptor11, this);

          _initDefineProp(this, "repository", _descriptor12, this);

          _initDefineProp(this, "data", _descriptor13, this);

          _initDefineProp(this, "route", _descriptor14, this);

          _initDefineProp(this, "pages", _descriptor15, this);

          this.router = Router;
          this.element = element;

          if (!this.repository && this.element.hasAttribute('resource')) {
            this.repository = entityManager.getRepository(this.element.getAttribute('resource'));
          }

          this.criteria.where = this.where;
          this.criteria.sort = this.criteria.sort || {};
        }

        DataTable.prototype.attached = function attached() {
          this.load();
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

          this.repository.find(this.criteria, true).then(function (result) {
            _this.data = result;
          }).catch(function (error) {
            _this.triggerEvent('exception', { on: 'load', error: error });
          });
        };

        DataTable.prototype.populate = function populate(row) {
          return this.repository.getPopulatedEntity(row);
        };

        DataTable.prototype.doDestroy = function doDestroy(row) {
          var _this2 = this;

          if (typeof this.destroy === 'function') {
            return this.destroy(row);
          }

          this.populate(row).destroy().then(function () {
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

        DataTable.prototype.doSort = function doSort(columnLabel) {
          var _criteria$sort;

          if (this.sortable === null || columnLabel.column.indexOf('.') !== -1) {
            return;
          }

          var column = columnLabel.column;

          this.criteria.sort = (_criteria$sort = {}, _criteria$sort[column] = this.criteria.sort[column] === 'asc' ? 'desc' : 'asc', _criteria$sort);

          this.load();
        };

        DataTable.prototype.searchColumnChanged = function searchColumnChanged() {
          return this.doSearch();
        };

        DataTable.prototype.doSearch = function doSearch() {
          var _criteria$where;

          this.criteria.where = (_criteria$where = {}, _criteria$where[this.searchColumn] = { contains: this.search }, _criteria$where);

          this.pager.reloadCount();

          this.load();
        };

        DataTable.prototype.reload = function reload() {
          this.pager.reloadCount();
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
          return new Statham(row, Statham.MODE_NESTED).fetch(propertyName);
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
          return { populate: null };
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "where", [_dec5], {
        enumerable: true,
        initializer: function initializer() {
          return {};
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "limit", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "columns", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "searchColumn", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 'name';
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "searchable", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sortable", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "edit", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "destroy", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "page", [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "select", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "repository", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "data", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "route", [bindable], {
        enumerable: true,
        initializer: null
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "pages", [bindable], {
        enumerable: true,
        initializer: null
      }), _applyDecoratedDescriptor(_class2.prototype, "columnLabels", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "columnLabels"), _class2.prototype)), _class2)) || _class) || _class) || _class));

      _export("DataTable", DataTable);
    }
  };
});