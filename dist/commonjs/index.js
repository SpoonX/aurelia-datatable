'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _aureliaViewManager = require('aurelia-view-manager');

function configure(aurelia) {
  aurelia.container.get(_aureliaViewManager.Config).configureNamespace('aurelia-data-table', {
    framework: 'bootstrap',
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./data-table');
}