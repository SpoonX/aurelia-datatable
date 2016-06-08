# Data-table
A data-table built with [Spoonx/Aurelia-orm](https://github.com/SpoonX/aurelia-orm)

## Bindables

#### columns
String representing the column names, supports renaming columns with `as` e.g. `name as username`.

#### repository
A entity with [Spoonx/Aurelia-orm](https://github.com/SpoonX/aurelia-orm).

## Optional attributes

##### destroy
Show delete button. Rows are removable, will trigger `deleted.delegate="myEventCallback($event)"` when clicked.

##### update 
Show edit button. Rows are editable, will trigger `updated.delegate="myEventCallback($event)"` when clicked.

##### sortable
Columns can be sorted.

##### searchable
Show the search field

## Custom html
You can override the html with your own by configuring it through the [Spoonx/Aurelia-view-manager](https://github.com/spoonx/aurelia-view-manager).

## Examples:

```js
this.dbData = entityManager.getRepository('users');
```

```html
    <data-table 
        deleted.delegate="myEventCallback($event)" 
        updated.delegate="myEventCallback($event)" 
        columns="id,name" 
        repository.bind="dbData" 
        default-column="name" 
        searchable 
        sortable 
        update 
        destroy
    ></data-table>
```

Pagination with [Spoonx/Aurelia-pager](https://github.com/SpoonX/aurelia-pager).

```html
<data-table repository.bind="dbData" page.bind="page"></data-table>

<pager resource.bind="dbData" page.bind="page"></pager>
```
