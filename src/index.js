import {Config} from 'aurelia-view-manager';

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-data-table', {
    framework: 'bootstrap',
    location : './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./data-table');
}
