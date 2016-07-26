define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var ColumnsFilterValueConverter = exports.ColumnsFilterValueConverter = function () {
    function ColumnsFilterValueConverter() {
      
    }

    ColumnsFilterValueConverter.prototype.toView = function toView(array) {
      return array.filter(function (item) {
        return item.column.indexOf('.') === -1;
      });
    };

    return ColumnsFilterValueConverter;
  }();
});