'use strict';

exports.__esModule = true;

var _aureliaDatatable = require('./aurelia-datatable');

Object.keys(_aureliaDatatable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaDatatable[key];
    }
  });
});