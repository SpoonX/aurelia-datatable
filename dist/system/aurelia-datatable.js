'use strict';

System.register(['aurelia-view-manager', './datatable', './columns-filter', './convert-manager'], function (_export, _context) {
  "use strict";

  var Config, Datatable, ColumnsFilterValueConverter, ConvertManagerValueConverter;
  function configure(aurelia) {
    aurelia.plugin('aurelia-pager');

    aurelia.container.get(Config).configureNamespace('spoonx/datatable', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./datatable');
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }, function (_datatable) {
      Datatable = _datatable.Datatable;
    }, function (_columnsFilter) {
      ColumnsFilterValueConverter = _columnsFilter.ColumnsFilterValueConverter;
    }, function (_convertManager) {
      ConvertManagerValueConverter = _convertManager.ConvertManagerValueConverter;
    }],
    execute: function () {}
  };
});