'use strict';

System.register(['./datatable', './columns-filter', './convert-manager', 'aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var Datatable, ColumnsFilterValueConverter, ConvertManagerValueConverter, Config;
  function configure(aurelia) {
    aurelia.plugin('aurelia-pager');

    aurelia.container.get(Config).configureNamespace('spoonx/datatable', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./datatable');
  }

  _export('configure', configure);

  return {
    setters: [function (_datatable) {
      Datatable = _datatable.Datatable;
    }, function (_columnsFilter) {
      ColumnsFilterValueConverter = _columnsFilter.ColumnsFilterValueConverter;
    }, function (_convertManager) {
      ConvertManagerValueConverter = _convertManager.ConvertManagerValueConverter;
    }, function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }],
    execute: function () {}
  };
});