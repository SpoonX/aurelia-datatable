import {Config,resolvedView} from 'aurelia-view-manager';
import {inject} from 'aurelia-dependency-injection';
import {ViewResources,bindable,customElement} from 'aurelia-templating';
import {getLogger} from 'aurelia-logging';
import {bindingMode,computedFrom} from 'aurelia-binding';
import {EntityManager} from 'aurelia-orm';
import {Router} from 'aurelia-router';
import {Homefront} from 'homefront';

// added for bundling
// eslint-disable-line no-unused-vars
// eslint-disable-line no-unused-vars
// eslint-disable-line no-unused-vars
export declare function configure(aurelia?: any): any;
export declare class ColumnsFilterValueConverter {
  toView(array?: any): any;
}
export declare class ConvertManagerValueConverter {
  constructor(viewResources?: any);
  runConverter(value?: any, converter?: any, convertParams?: any, rowData?: any): any;
  toView(value?: any, converters?: any, rowData?: any): any;
  parseParams(str?: any): any;
}
export declare class DataTable {
  criteria: any;
  where: any;
  limit: any;
  columns: any;
  searchColumn: any;
  actions: any;
  searchable: any;
  sortable: any;
  edit: any;
  destroy: any;
  page: any;
  loadingIndicator: any;
  populate: any;
  detailView: any;
  sortNested: any;
  select: any;
  repository: any;
  resource: any;
  data: any;
  route: any;
  pages: any;
  footer: any;
  loading: any;
  hasVisibleActions: any;
  offlineMode: any;
  constructor(router?: any, element?: any, entityManager?: any);
  attached(): any;
  detached(): any;
  pageChanged(): any;
  limitChanged(): any;
  load(): any;
  gatherData(criteria?: any): any;
  populateEntity(row?: any): any;
  doDestroy(row?: any, index?: any): any;
  doEdit(row?: any, index?: any): any;
  doCustomAction(action?: any, row?: any, index?: any): any;
  checkDisabled(action?: any, row?: any): any;
  checkVisibility(action?: any, row?: any): any;
  showActions(): any;
  doSort(columnLabel?: any): any;
  searchColumnChanged(newValue?: any, oldValue?: any): any;
  doSearch(): any;
  reload(): any;
  colspan: any;
  columnLabels: any;
  triggerEvent(event?: any, payload?: any): any;
  selected(row?: any, columnOptions?: any): any;
  isSortable(column?: any): any;
  displayValue(row?: any, propertyName?: any): any;
  collapseRow(row?: any): any;
}