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
| `options`      | It's one of the way to pass the options to the select: the elements inside the slot shall be `divs` with a `value` attribute and a `text` attribute that are used to define the option.


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
| `placeholder`           | `String`                        | `''`      | The placeholder.
| `label`                 | `String`                        | `''`      | The label.
| `labels`                | `Object`                        | `null`    | The dictionary to map the response.
| `multi`                 | `Boolean`                       | `false`   | True if it's a multiselect.
| `options`               | `Array`                         | `[]`      | Array of the options in the form of Objects.
| `requestHeaders`        | `Object`                        | `{...}`   | The headers of the HTTP request.
| `requestType`           | <code>'GET'&#124;'POST'</code>  | `'GET'`   | The type of the HTTP request.
| `searchInput`           | `Boolean`                       | `false`   | True to enable the search input for the options list.
| `searchLabel`           | `String`                        | `'search'`| The label of the search input.
| `useOnlyHttpParameters` | `Boolean`                       | `false`   | True to ignore the default pagination.
| `paginated`             | `Boolean`                       | `false`   | True if the the response is never paginated.
| `listProp`              | `String`                        | `false`   | Name of the property in response.data where the list is stored.
| `totalRowsProp`         | `String`                        | `false`   | Name of the property in response.data where the number of total rows is stored.
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
| `jvx-menu-openeed`    |               | *None*  | Fired when the the menu is opened.
| `jvx-menu-closed`     |               | *None*  | Fired when the the menu is closed.

### CSS Custom Properties
*None*

#### Global Custom Properties

| Name                                              | Default                           | Description
| ------------------------------------------------- | --------------------------------- |------------
| `--jvx-multiselect-primary`                       | `blue`                            | Color of the select bottom line when idle.
| `--jvx-multiselect-accent`                        | `green`                           | Color of the underline ripple, the outline, and the caret  when active.
| `--jvx-multiselect-error`                         | `red`                             | Color of the underline ripple, the outline, and the caret when has errors.
| `--jvx-multiselect-color`                         | `#000`                            | Color of the text.
| `--jvx-multiselect-background-color`              | `#fff`                            | Color of the background of the menu.
| `--jvx-material-input-height`                     | ``                                | Height of the select.
| `--jvx-multiselect-selection-color`               | `currentColor`                    | Color of the selected value.
| `--jvx-multiselect-selection-font-size`           | `14px`                            | Font size of the selected value.
| `--jvx-multiselect-selection-font-weight`         | `400`                             | Font weight of the selected value.
| `--jvx-multiselect-label-color`                   | `currentColor`                    | Color of the label.
| `--jvx-multiselect-label-font-size`               | `14px`                            | Font size of the label.
| `--jvx-multiselect-label-font-weight`             | `400`                             | Font weight of the label.
| `--jvx-multiselect-placeholder-color`             | `var(--jvx-multiselect-color`)    | Color of the placeholder.
| `--jvx-multiselect-placeholder-font-size`         | `14px`                            | Font size of the placeholder.
| `--jvx-multiselect-placeholder-font-weight`       | `400`                             | Font weight of the placeholder.

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
var requestHeaders = {
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
```typescript
var obj: {
  value: Number|String,
  text: String
}
``` 
If the object comes in different form, via the property `labels` it is possible to set an object that maps the properties in order to make it readable for the jvx-multiselect.
For example if the response object template is
```javascript
var response = {
  id: 1,
  title: 'This is the title',
  description: 'This is the description',
  start: 2020/01/01,
  end: 2020/03/01
}
``` 
and the property `labels` is
```javascript
var labels = {
  id: 'value',
  title: 'text'
}
``` 
the response object will be mapped like this
```javascript
var response = {
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
var pagination = {
  page: 1,
  pageSize: 15
}
```
Whenever the scrollbar in the menu reaches the bottom, the property `page` is incremented by one and a further http request is called. When the user searches or closes the menu the property `page` is set again at `1`.
The jvx-multiselect copies these values individually in the object of the search parameters.

### Slots
#### option-item
The slot `option-item` allows to define a template for the options that will be shown in the dropdown menu. It is possible to access the context wrapping it between square brackets.
i.e.: Let's say we have the following structure:

```javascript
var options = [{
  value: 1, 
  text: 'Lorem ipsum',
  color: 'blue',
  preview: 'path/to/first-image.jpg'
},
  {
    value: 2,
    text: 'dolor sit amet',
    color: 'red',
    preview: 'path/to/second-image.jpg'
  }];
```

and we want our options to have in the text field both the property color and the property text.
We can write the template like so:
```html
<div slot="option-item">[[option.text]] [[option.color]]</div>
```

It's possible to use the context inside attributes too. In that case it's suggested to preppend the string `data-jvx-` to all the attributes' names that will access the context.
i.e. 
```html
<div slot="option-item">
    <span>[[option.text]]</span>
    <span>
        <img data-jvx-src="[[option.preview]]"/>
    </span>
</div>
```

#### selected-item
This slot works exactly as `option-item`, but it is used to style the selected value when `multi` is false.

#### options
The slot options is there to provide an easy way to describe all the available options of the select.
This is necessary because some frameworks may have problems in passing the array to the `options` prop.
Each option will be a `div` and all the properties of the corresponding object can be written inside an attribute preceded by `data-jvx-`, like so:
```html
<div slot="options">
    <div value="1" text="Lorem ipsum" data-jvx-color="blue" data-jvx-preview="path/to/first-image.jpg"></div>
    <div value="2" text="dolor sit amet" data-jvx-color="red" data-jvx-preview="path/to/second-image.jpg"></div>
</div>
```



