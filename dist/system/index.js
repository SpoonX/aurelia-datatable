'use strict';

System.register(['aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var Config;
  return {
    setters: [function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }],
    execute: function () {
      function configure(aurelia) {
        aurelia.plugin('aurelia-pager');

        aurelia.container.get(Config).configureNamespace('spoonx/datatable', {
          framework: 'bootstrap',
          location: './{{framework}}/{{view}}.html'
        });

        aurelia.globalResources('./datatable');
      }

      _export('configure', configure);
    }
  };
});