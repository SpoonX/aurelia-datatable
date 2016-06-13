# aurelia-orm

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

A data-table featuring [Spoonx/Aurelia-orm](https://github.com/SpoonX/aurelia-orm) and [Spoonx/Aurelia-pager](https://github.com/SpoonX/aurelia-pager)

Features:

* Pagination
* Intergrated ORM
* Search
* Custom columns
* And more

## Installation

### Jspm/SytemJs

Run `jspm i npm:aurelia-datatable` from your project root.

### Webpack

Run `npm i aurelia-datatable --save` from your project root.

## Documentation

You can find usage examples and the documentation at [aurelia-orm-doc](http://aurelia-datatable.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Example

Here's a snippet to give you an idea of what this module supports.

```js
this.repository = entityManager.getRepository('users');
```

```html
  <data-table 
      deleted.delegate="myEventCallback($event)" 
      updated.delegate="myEventCallback($event)" 
      columns="id,name as username" 
      repository.bind="repository" 
      search-column="name" 
      searchable 
      sortable 
      update 
      destroy
  ></data-table>
```
