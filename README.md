# Data-table
A data-table with pagination built with [Spoonx/Aurelia-orm](https://github.com/SpoonX/aurelia-orm) and [Spoonx/Aurelia-pager](https://github.com/SpoonX/aurelia-pager)

### columns
String representing the column names, supports renaming columns with `as` e.g. `name as username`.

### repository (optional)
A entity with [Spoonx/Aurelia-orm](https://github.com/SpoonX/aurelia-orm) e.g. `entityManager.getRepository('users')`

### resource (optional)
The name of a repository e.g. `users`

### limit
The amount of items to show on 1 page, defaults to 30.

## Optional attributes

### destroy
Show delete button. Rows are removable, will trigger `deleted.delegate="myEventCallback($event)"` when clicked.

### update 
Show edit button. Rows are editable, will trigger `updated.delegate="myEventCallback($event)"` when clicked.

### sortable
Columns can be sorted.

### searchable
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
