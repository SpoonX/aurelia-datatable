import { Config } from 'aurelia-view-manager';

export function configure(aurelia) {
  aurelia.plugin('aurelia-pager');

  aurelia.container.get(Config).configureNamespace('spoonx/datatable', {
    framework: 'bootstrap',
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable');
}