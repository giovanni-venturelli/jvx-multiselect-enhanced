# \<jvx-multiselect\>

A web component that offers a multipurpose material multiselect which handle both synchronous and asynchronous selections.

## Install jvx-material-input

```
npm install jvx-material-multiselect
```

## API

### Slots
| Name           | Description
| -------------- | -----------
| `option-item`  | Use this slot to pass a custom template for the options. Use [[option.propertyname]] to access the property of the item. The template should be styled inline.


### Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `multi` | `Boolean` | `false` | True if it's a multiselect.
| `closeOnClick` | `Boolean` | `false` | True if the options list must be closed on each click outside the component.
| `label` | `String` | `''` | The label.
| `value` | `Array` | `[]` | The current value of the selection.
| `disabled` | `Boolean` | `false` | True to disable the select.
| `clearable` | `Boolean` | `false` | True to enable the empty selection.
| `searchInput` | `Boolean` | `false` | True to enable the search input for the options list.
| `advancedSearch` | `Boolean` | `false` | True to enable the advanced search (searchInput must be true).
| `useOnlyPostParameters` | `Boolean` | `false` | True to ignore the default pagination.
| `postParameters` | `Object` | `null` | The custom search value and pagination for the asynchronous selection.
| `filter` | `Object` | `null` | The custom filter for the post call.
| `labels` | `Object` | `null` | The dictionary to map the response.
| `url` | `String` | `''` | The url to get the options.

### Methods
*None*

### Events

| Event Name | Target         | Detail | Description
| ---------- | -------------- | ------ | -----------
| `input`     |               | `String`| Fired when the user changes the value of the input. The detail contains the new value.

### CSS Custom Properties
*None*

#### Global Custom Properties

| Name                                              | Default               | Description
| ------------------------------------------------- | --------------------- |------------
| `--jvx-material-input-primary`                    | `blue`                | Color of the filled input's bottom line when idle.
| `--jvx-material-input-background`                 | `#fff`                | Color of the input's background fill.
| `--jvx-material-input-accent`                     | `#b949d5`             | Color when active of the underline ripple, the outline, and the caret.
