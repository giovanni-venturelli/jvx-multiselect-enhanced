# \<jvx-multiselect\>

A web component that offers a multipurpose material multiselect which handles both synchronous and asynchronous selections.

## Install jvx-multiselect

```
npm install jvx-multiselect
```

## API

### Slots
| Name           | Description
| -------------- | -----------
| `option-item`  | Use this slot to pass a custom template for the options. Use [[option.propertyname]] to access the property of the item. The template should be styled inline.


### Properties/Attributes
| Name                    | Type                            | Default   | Description
| ----------------------- | ------------------------------- | ----------| ---------------------------------------------------------------------------
| `advancedSearch`        | `Boolean`                       | `false`   | True to enable the advanced search (searchInput must be true).
| `clearable`             | `Boolean`                       | `false`   | True to enable the empty selection.
| `closeOnClick`          | `Boolean`                       | `false`   | True if the options list must be closed on each click outside the component.
| `disabled`              | `Boolean`                       | `false`   | True to disable the select.
| `filter`                | `Object`                        | `null`    | The custom filter for the post call.
| `flatRound`             | `Boolean`                       | `false`   | When true gives the jvx-multiselect a nice flat-rounded appearance.
| `hasErros`              | `Boolean`                       | `false`   | True to display the component in the "error" mode.
| `httpParameters`        | `Object`                        | `null`    | The custom search value and pagination for the asynchronous selection.
| `itemText`              | `String`                        | `'text'`  | The name of the property of the option object that will be displayed as description of the options.
| `itemValue`             | `String`                        | `'value'` | The name of the property of the option object that will be treated as value of the options.
| `label`                 | `String`                        | `''`      | The label.
| `labels`                | `Object`                        | `null`    | The dictionary to map the response.
| `multi`                 | `Boolean`                       | `false`   | True if it's a multiselect.
| `options`               | `Array`                         | `[]`      | Array of the options in the form of Objects.
| `requestHeaders`        | `Object`                        | `{...}`   | The headers of the HTTP request.
| `requestType`           | <code>'GET'&#124;'POST'</code>  | `'GET'`   | The type of the HTTP request.
| `searchInput`           | `Boolean`                       | `false`   | True to enable the search input for the options list.
| `searchLabel`           | `String`                        | `'search'`| The label of the search input.
| `useOnlyHttpParameters` | `Boolean`                       | `false`   | True to ignore the default pagination.
| `url`                   | `String`                        | `''`      | The url to get the options.
| `value`                 | `Array`                         | `[]`      | The current value of the selection.

### Methods
*None*

### Events

| Event Name            | Target        | Detail  | Description
| --------------------- | ------------- | ------- | -----------
| `input`               |               | `Array` | Fired when the user changes the value of the input. The detail contains the value of the selection.
| `showAdvancedSearch`  |               | *None*  | Fired when the user clicks on the advanced search icon.
| `response`            |               | `Object`| Fired when the backend call returns successfully. The detail contains the response.
| `invalid-jwt`         |               | `Object`| Fired when the backend call returns with an invalit jwt error. The detail contains the response.
| `error`               |               | `String`| Fired when the backend call throws an exception. The detail contains the exception.
| `scrollEnd`           |               | *None*  | Fired when the scrollbar in the options menu reaches the bottom.

### CSS Custom Properties
*None*

#### Global Custom Properties

| Name                                              | Default               | Description
| ------------------------------------------------- | --------------------- |------------
| `--jvx-multiselect-primary`                       | `blue`                | Color of the select bottom line when idle.
| `--jvx-multiselect-accent`                        | `green`               | Color of the underline ripple, the outline, and the caret  when active.
| `--jvx-multiselect-error`                         | `red`                 | Color of the underline ripple, the outline, and the caret when has errors.
| `--jvx-multiselect-background-color`              | `#fff`                | Color of the background of the menu.

### HTTP Request

#### Request
The HTTP request can be either a GET or a POST request.
The user can set the type using the property `requestType` which is set to `'GET'` by default.

The HTTP request will be executed via [axios](https://github.com/axios/axios).

#### httpParameters
The parameters for the HTTP request are stored in the property `httpParameters`. 
If the property `useOnlyHttpParamters` is `false`,  a new object will be created which will integrate a copy of `httpParameters` will be completed as follows:

```javascript
  Object.assign(httpParametersCopy, {
        search: this.searchValue,
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        filter: !!this.filter && (typeof this.filter === 'object' || this.filter.length > 0) ? JSON.stringify(this.filter) : null
      });
``` 

This object will be passed in the property `data` or in the property `params` of the axios request depending on the HTTP request type.

##### Headers
The headers can be set in the property `requestHeaders`. By default the jvx-multiselect uses the property `trusted` stored in the sessionStorage.
The default headers are:

```javascript
{
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Content-Type': 'application/json',
  'Authorization': window.sessionStorage.getItem('trusted')
}
```

#### Response
By now the response must contain an array of objects, stored in the property `message` in the `response.data` object.

The object template should be 
```javascript
{
  value: Number|String,
  text: String
}
``` 
If the object comes in different form, via the property `labels` it is possible to set an object that maps the properties in order to make it readable for the jvx-multiselect.
For example if the response object template is
```javascript
{
  id: 1,
  title: 'This is the title',
  description: 'This is the description',
  start: 2020/01/01,
  end: 2020/03/01
}
``` 
and the property `labels` is
```javascript
{
  id: 'value',
  title: 'text'
}
``` 
the response object will be mapped like this
```javascript
{
  value: 1,
  text: 'This is the title',
  id: 1,
  title: 'This is the title',
  description: 'This is the description',
  start: 2020/01/01,
  end: 2020/03/01,
  selected: Boolean
}
```
The user can use the properties `itemText` and `itemValue` to prevent the need for the mapping (being in the example above `itemText = 'title'` and `itemValue = 'id'`).
#### Search
When the user searches for a term, the property `searchInput` is updated with the searched value. Its value is then copied in the property `search` of the object of the search parameters. 
#### Pagination
The property `pagination` is structured by default as follows:
```javascript
{
  page: 1,
  pageSize: 15
}
```
Whenever the scrollbar in the menu reaches the bottom, the property `page` is incremented by one and a further http request is called. When the user searches or closes the menu the property `page` is set again at `1`.
The jvx-multiselect copies these values individually in the object of the search parameters.




