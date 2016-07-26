# Usage

```js
this.repository = entityManager.getRepository('users');
```

```html
  <datatable
      destroy.delegate="myEventCallback($event)"
      edit.delegate="myEditImplementation($event)"
      columns="id,name as 'username', user.id as 'User id'"
      repository.bind="repository"
      searchable
      sortable
      actions.bind="actions"
      populate="user"
  ></datatable>
```

## Attributes
Datatable supports a couple of attributes allowing you to customize behavior.

### columns
Comma-separated string representing the column names to display. This is used for table content, but also the table headers. There's support for nested objects, as well as aliases. Example:

#### Simple
```html
<datatable resource="product" columns="name,price"></datatable>
```

#### Aliased
```html
<datatable resource="product" columns="name as product,price as 'Market price'"></datatable>
```

#### Full-blown
```html
<datatable resource="product" populate="group" columns="name,price as 'Market price',group.name as 'Product group'"></datatable>
```

#### valueConverters
You can give every colum a `valueConverter`. You need to define the converter in your `main.js` as a global resource. *[More information](http://eisenbergeffect.bluespire.com/binding-with-value-converters-in-aurelia/)()

Example:

```js
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources('dateFormatValueConverter')
    .globalResources('priceFormatterValueConverter')
}
```

```html
<datatable 
  resource="product" 
  columns="name, price as 'Market price' | , createdAt | dateFormat: 'yyyy-mm-dd'"
></datatable>
```

### repository
When given a repository, the datatable will use it to populate the table with.

This is as simple as `EntityManager.getRepository('resource')`.

*[More information](http://aurelia-orm.spoonx.org/api_repository.html)*.

### resource
This tells the component which repository to get.
This takes away the code you'd otherwise have to write with the `repository` attribute.

### limit
Number of rows to show per-page. Defaults to 30.

### where
A simple object containing a where clause to restrict the data returned from the API.

**Note:** Only useful when combined with `resource` or `repository`.

Example:

```js
this.where = {group: 5, price: {'>': 10}};
```

```html
<datatable resource="product" where.bind="where" columns="name,price"></datatable>
```

### searchable
Allow the user to search through the datatable. This will display a dropdown (`<select />`, for you to choose a column) and a simple input field. The value from the input field is used to search using `contains`.

**Note:** Only useful when combined with `resource` or `repository`.

### search-column
The initial search field, defaults to `name`. This value changes when another value has been selected from the dropdown.

### destroy
* Using this attribute will cause datatable to add a delete button on every row.
* When given a callback, datatable will call it when the user clicks the destroy action in the datatable.
* When provided without a function, datatable will call `.destroy()` on the entity (only useful when combined with `resource` or `repository`).

### edit
* Using this attribute will cause datatable to add an edit button on every row.
* You must provide a callback, which will be called when the user clicks the edit button. You'll be passed the row object.

### sortable
Allow rows to be sorted. When provided, this will cause datatable to add clickable table headers (to apply sorting for the selected header).

**Note:** Only useful when combined with `resource` or `repository`.

```html
<datatable sortable></datatable>
```

### populate
Which associations to populate for `columns` and `edit`. Defaults to none.

**Note:** Only useful when combined with `resource` or `repository`.

```html
<datatable populate="user,group"></datatable>
```

### actions
Allow the user to add custom action buttons in case he needs more than just `edit` and/or `destroy` on the rows.

Example:

```js
class ViewModel {
  actions = [{
    icon  : 'flag',    // font-awesome icon name
    title : 'My Title' // button title if `icon` is not set
    type  : 'danger',  // bootstrap button type
    action: (record) => {
      this.customAction(record); 
    },
    disabled: record => {
      // disable button with id higher than 5
      return record.id > 5;
    }
  }];
}
```

```html
<datatable actions.bind="actions" ></datatable>
```

### criteria
Full criteria object used to talk to the API. This object contains the `where`, `skip`, `limit`, `sort` and `populate`.

**Note:** Only use this option if you know what you're doing. Only useful when combined with `resource` or `repository`.

## Changing framework
You can override the framework used for the datatable with any of the [supported ones](https://github.com/SpoonX/aurelia-datatable/tree/master/src) using the [aurelia-view-manager](https://github.com/spoonx/aurelia-view-manager).
