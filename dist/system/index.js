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
        aurelia.container.get(Config).configureNamespace('aurelia-data-table', {
          framework: 'bootstrap',
          location: './{{framework}}/{{view}}.html'
        });

        aurelia.globalResources('./data-table');
      }

      _export('configure', configure);
    }
  };
});