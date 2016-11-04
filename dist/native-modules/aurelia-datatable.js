import { Config } from 'aurelia-view-manager';

import { Datatable } from './datatable';
import { ColumnsFilterValueConverter } from './columns-filter';
import { ConvertManagerValueConverter } from './convert-manager';

export function configure(aurelia) {
  aurelia.plugin('aurelia-pager');

  aurelia.container.get(Config).configureNamespace('spoonx/datatable', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable');
}