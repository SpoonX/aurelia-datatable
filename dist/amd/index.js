define(['exports', './aurelia-datatable'], function (exports, _aureliaDatatable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaDatatable).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaDatatable[key];
      }
    });
  });
});