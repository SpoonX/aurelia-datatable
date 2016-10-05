define(['exports', './datatable', './columns-filter', './convert-manager', 'aurelia-view-manager'], function (exports, _datatable, _columnsFilter, _convertManager, _aureliaViewManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.plugin('aurelia-pager');

    aurelia.container.get(_aureliaViewManager.Config).configureNamespace('spoonx/datatable', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./datatable');
  }
});