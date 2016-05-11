'use strict';

System.register([], function (_export, _context) {
  var ColumnsFilterValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('ColumnsFilterValueConverter', ColumnsFilterValueConverter = function () {
        function ColumnsFilterValueConverter() {
          _classCallCheck(this, ColumnsFilterValueConverter);
        }

        ColumnsFilterValueConverter.prototype.toView = function toView(array) {
          return array.filter(function (item) {
            return item.column.indexOf('.') === -1;
          });
        };

        return ColumnsFilterValueConverter;
      }());

      _export('ColumnsFilterValueConverter', ColumnsFilterValueConverter);
    }
  };
});