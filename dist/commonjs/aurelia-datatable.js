'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _datatable = require('./datatable');

var _columnsFilter = require('./columns-filter');

var _convertManager = require('./convert-manager');

var _aureliaViewManager = require('aurelia-view-manager');

function configure(aurelia) {
  aurelia.plugin('aurelia-pager');

  aurelia.container.get(_aureliaViewManager.Config).configureNamespace('spoonx/datatable', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable');
}