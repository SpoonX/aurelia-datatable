export class ColumnsFilterValueConverter {
  toView(array) {
  	return array.filter(item => item.column.indexOf('.') === -1);
  }
}