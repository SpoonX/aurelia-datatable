define(['exports', 'aurelia-view-manager', './datatable', './columns-filter', './convert-manager'], function (exports, _aureliaViewManager, _datatable, _columnsFilter, _convertManager) {
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