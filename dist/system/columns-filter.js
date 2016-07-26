'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var ColumnsFilterValueConverter;

  

  return {
    setters: [],
    execute: function () {
      _export('ColumnsFilterValueConverter', ColumnsFilterValueConverter = function () {
        function ColumnsFilterValueConverter() {
          
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