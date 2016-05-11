'use strict';

System.register([], function (_export, _context) {
  return {
    setters: [],
    execute: function () {
      function configure(config) {
        config.globalResources('./data-table');
      }

      _export('configure', configure);
    }
  };
});