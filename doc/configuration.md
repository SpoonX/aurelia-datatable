# Configuration

### columns
String representing the column names, supports renaming columns with `as` e.g. `name as username`.

### repository (optional)
This tells the component where it can find the data to populate the element. This is a simple `EntityManager.getRepository('resource')`. [More information](http://aurelia-orm.spoonx.org/api_repository.html).

### resource (optional)
This tells the component which repository to get. This takes away the code you'd otherwise have to write with repository.bind.

### limit
Defaults to 30.

### criteria
Pass along filter criteria to the element. These will be used to restrict the data returned from the API.

### searchColumn
The default search field, defaults to `name`.

###destroy
Show delete button. Rows are removable, will trigger `destroyed.delegate="myEventCallback($event)"` when clicked.

### update 
Show edit button. Rows are editable, will trigger `edit.delegate="myFunction($row)"` when clicked.

### sortable
Allow columns to be sorted.

### searchable
Show the search field.

### Custom html
You can override the html with your own by configuring through the [Spoonx/Aurelia-view-manager](https://github.com/spoonx/aurelia-view-manager).
