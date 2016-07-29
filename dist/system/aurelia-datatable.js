'use strict';

System.register(['aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var Config;
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
    }],
    execute: function () {}
  };
});