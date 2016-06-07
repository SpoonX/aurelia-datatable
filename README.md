# Data-table
A data-table built with [Spoonx/Aurelia-orm](https://github.com/SpoonX/aurelia-orm)

## Bindables

#### columns
String representing the column names, supports renaming columns with `as` e.g. `name as username`.

#### repository (optional)
A entity with [Spoonx/Aurelia-orm](https://github.com/SpoonX/aurelia-orm).
When no repository is given it will prevent `destroy` and `update` buttons from showing.

#### data (optional)
When not using a repository you can give an array with objects to this bindable.

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

Pagination through [Spoonx/Aurelia-paged](https://github.com/SpoonX/aurelia-paged) and [Spoonx/Aurelia-pager](https://github.com/SpoonX/aurelia-pager).

```html
<paged resource.bind="dbData" data.bind="data" page.bind="page">
    <data-table 
        data.bind="data" 
        columns="id,name" 
        default-column="name" 
        searchable 
        sortable
    ></data-table>
</paged>

<pager resource.bind="dbData" page.bind="page"></pager>
```

 It is possible to add a repository but that will invoke a extra request to the back-end since the data gets retrieved by `paged`.

```html
<paged resource.bind="dbData" data.bind="data" page.bind="page">
    <data-table 
        repository.bind="dbData" 
        data.bind="data" 
        columns="id,name" 
        default-column="name" 
        searchable 
        sortable
    ></data-table>
</paged>

<pager resource.bind="dbData" page.bind="page"></pager>
```
