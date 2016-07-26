# aurelia-datatable

[![Build Status](https://travis-ci.org/SpoonX/aurelia-datatable.svg)](https://travis-ci.org/SpoonX/aurelia-datatable)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

A data-table using [aurelia-orm](https://github.com/SpoonX/aurelia-orm) and [aurelia-pager](https://github.com/SpoonX/aurelia-pager)

Features:

* Pagination
* Sorting
* Integrated ORM
* Search
* Custom columns
* Custom button actions
* Custom valueConverters
* And more

## Installation

### Jspm/SytemJs

Run `jspm i aurelia-datatable` from your project root.

### Webpack

Run `npm i aurelia-datatable --save` from your project root.

## Documentation

You can find usage examples and the documentation [here](http://aurelia-datatable.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Example

Here's a snippet to give you an idea of what this module supports.

```js
this.repository = entityManager.getRepository('users');
```

```html
  <data-table 
      destroy.delegate="myEventCallback($event)" // or without the function to let ORM take care of it
      edit.delegate="myEventCallback($event)" 
      columns="id,name as 'username', createdAt | dateFormat: 'yyyy-mm-dd'" 
      repository.bind="repository" 
      search-column="name" 
      searchable 
      sortable 
  ></data-table>
```
