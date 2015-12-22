System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia, callback) {
    aurelia.globalRessource('./data-table');
  }

  return {
    setters: [],
    execute: function () {}
  };
});