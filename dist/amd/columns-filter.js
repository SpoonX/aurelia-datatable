define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ColumnsFilterValueConverter = exports.ColumnsFilterValueConverter = function () {
    function ColumnsFilterValueConverter() {
      _classCallCheck(this, ColumnsFilterValueConverter);
    }

    ColumnsFilterValueConverter.prototype.toView = function toView(array) {
      return array.filter(function (item) {
        return item.column.indexOf('.') === -1;
      });
    };

    return ColumnsFilterValueConverter;
  }();
});