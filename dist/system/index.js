System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia, callback) {
    aurelia.globalRessource('./dataTable');
  }

  return {
    setters: [],
    execute: function () {}
  };
});