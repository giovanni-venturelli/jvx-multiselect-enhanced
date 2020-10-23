# \<jvx-multiselect\>

A web component that offers a multipurpose material multiselect which handle both synchronous and asynchronous selections.

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
| Name                    | Type                        | Default  | Description
| ----------------------- | --------------------------- | ---------| ---------------------------------------------------------------------------
| `options`               | `Array`                     | `[]`     | Array of the options in the form of Objects.
| `itemText`              | `String`                    | `'text'` | The name of the property of the option object that will be displayed as description of the options.
| `itemValue`             | `String`                    | `'value'`| The name of the property of the option object that will be treated as value of the options.
| `multi`                 | `Boolean`                   | `false`  | True if it's a multiselect.
| `closeOnClick`          | `Boolean`                   | `false`  | True if the options list must be closed on each click outside the component.
| `label`                 | `String`                    | `''`     | The label.
| `value`                 | `Array`                     | `[]`     | The current value of the selection.
| `disabled`              | `Boolean`                   | `false`  | True to disable the select.
| `clearable`             | `Boolean`                   | `false`  | True to enable the empty selection.
| `searchInput`           | `Boolean`                   | `false`  | True to enable the search input for the options list.
| `advancedSearch`        | `Boolean`                   | `false`  | True to enable the advanced search (searchInput must be true).
| `useOnlyPostParameters` | `Boolean`                   | `false`  | True to ignore the default pagination.
| `postParameters`        | `Object`                    | `null`   | The custom search value and pagination for the asynchronous selection.
| `filter`                | `Object`                    | `null`   | The custom filter for the post call.
| `labels`                | `Object`                    | `null`   | The dictionary to map the response.
| `url`                   | `String`                    | `''`     | The url to get the options.
| `requestType`           | <code>GET&#124;POST</code>  | `'GET'`  | The type of the http request.
| `requestHeaders`           | `Object`                    | `{}`     | The headers of the http request.


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

### CSS Custom Properties
*None*

#### Global Custom Properties

| Name                                              | Default               | Description
| ------------------------------------------------- | --------------------- |------------
| `--jvx-material-input-primary`                    | `blue`                | Color of the select bottom line when idle.
| `--jvx-material-input-accent`                     | `green`               | Color of the underline ripple, the outline, and the caret  when active.
| `--jvx-material-input-error`                      | `red`                 | Color of the underline ripple, the outline, and the caret when has errors.

### HTTP Request
#### Request
The HTTP request can be either a GET or a POST request.
The user can set the type using the property `requestType` which is set to `GET` by default.

The HTTP request will be executed via [axios](https://github.com/axios/axios).

##### Headers
The headers can be set in the property `requestHeaders`. By default the jvx-multiselect uses the property `trusted` stored in the sessionStorage.
The default headers are:
```javascript
{
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Content-Type': 'application/json',
  Authorization: window.sessionStorage.getItem('trusted')
}
```

#### Response
By now the response must contain an array of object, stored in the property `message` in the `response.data` object.

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
The user can use the properties `itemText` and `itemValue` to prevent the need for the mapping (being in the example above `itemText = 'title'` and `itemValue = 'id'`.

#### Pagination
The pagination is not supported yet, but will be in the next releases.
By now please always set `useOnlyPostParameters` to `true`.

