import {Datatable} from './datatable';
import {ColumnsFilterValueConverter} from './columns-filter';
import {ConvertManagerValueConverter} from './convert-manager';
import {Config} from 'aurelia-view-manager';

// added for bundling
// eslint-disable-line no-unused-vars
// eslint-disable-line no-unused-vars
// eslint-disable-line no-unused-vars

export function configure(aurelia) {
  aurelia.plugin('aurelia-pager');

  aurelia.container.get(Config).configureNamespace('spoonx/datatable', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable');
}
