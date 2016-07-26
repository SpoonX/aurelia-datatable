'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaDatatable = require('./aurelia-datatable');

Object.keys(_aureliaDatatable).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaDatatable[key];
    }
  });
});