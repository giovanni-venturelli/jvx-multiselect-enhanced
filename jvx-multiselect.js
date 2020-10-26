import {LitElement, html, css} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {repeat} from 'lit-html/directives/repeat';
import '@material/mwc-button';
import '@material/mwc-menu';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-textfield';
import 'paper-chip';
import 'jvx-material-input';
import {axios} from '@bundled-es-modules/axios';

/**
 * `jvx-multiselect`
 * a multiselect
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class JvxMultiselect extends LitElement {
  render() {
    return html`
      <div style="position:relative; display: inline;" class=${classMap({
      'jvx-multiselect': true,
      'jvx-multiselect-error': this.hasErrors,
      'jvx-multiselect-isFocused': this.isOpen || this.isFocused,
      'jvx-multiselect-isOpen': this.isOpen,
      'jvx-multiselect-has-state': this.isOpen || this.hasErrors === true || this.disabled,
      'jvx-multiselect-disabled': this.disabled
    })}>
      <!-- region input container -->
        <div id="multiInputField" class=${classMap({
      'input-container': true,
      'menu-is-open': this.isOpen,
      'selection-active': this.value !== null && this.value.length > 0
    })} >
        <label>${this.label}</label>
        <div class="input-container__selected-container" @click="${this.toggleMenu}">
      <div class="input-container__selected"> 
     ${this.multi ? html`
     <span>
       ${repeat(this.value, item => item[this.itemValue], (item, index) => html`
          <paper-chip noHover="true" label="${item[this.itemText]}" closable 
          @chip-removed="${() => {
        this.select(item)
      }}">
          </paper-chip>`)}
     </span>`
      : html`
        ${repeat(this.value, item => item[this.itemValue], (item, index) => html`
  <div> ${item[this.itemText]}</div>     
        `)}
      `}
      </div>  
        <!-- region remove button -->  
        ${this.value.length > 0 && this.multi === false && this.clearable === true ? html`
        <div class="input-container__remove-button-container">
          <mwc-icon @click="${(e) => {
      e.preventDefault();
      e.stopPropagation();
      this.select(this.value[0])
    }}" class="input-container__remove-button">
        close
        </mwc-icon></div>` : html``
    }
        <!--- endregion -->
        <!-- region arrow icon -->
        <div class="input-container__arrow">
                  ${!this.isLoading ? html`
                  <mwc-icon>arrow_drop_down
                  </mwc-icon>
                  ` : html`
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  `}               
                </div>
        <!-- endregion -->
                </div>
        </div>
        <!-- endregion -->
        <!-- region menu -->
        <mwc-menu fullwidth id="optionsMenu"  @closed="${this.onMenuToggled}" @opened="${this.onMenuToggled}">
                    
          <!-- region search input -->
          <div class="optionsMenu__search-input-container">
          ${this.searchInput ? html`<jvx-material-input
                            label="${this.searchLabel}"
                            type="text"
                          @val-change="${this._onSearch}" 
                          background-color="transparent"
                          class="ma-0 pa-0 jvx-multiselect-search-field"
                          flat
                          @click:append="$emit('showAdvancedSearch')"
                          @click:clear="${this._onSearch}"
                          value="${this.searchValue}">
                          ${this.advancedSearch ? html`
                          <div slot="append">
                             <mwc-icon-button id="advanced-search-button" icon="more_vert" @click="${this.showAdvancedSearch}">
                            </mwc-icon-button></div>` : html``}
            </jvx-material-input>` : html``}
            
        </div>
        <!-- endregion -->
        <!--       region list-->
        <div class="jvx-multiselect__list-container">
            <mwc-list multi="${this.multi}">
        ${repeat(this.selectableItems, item => item[this.itemValue], (item, index) => html`
             <mwc-list-item class="list-option"  .selected="${item.selected}" .activated="${item.selected}" value="${item[this.itemValue]}" @click="${(e) => {
      this.select(item)
    }}">
             <div class="list-option-content" data-value="${item[this.itemValue]}">
      ${item[this.itemText]}
      </div>
                      
                   </mwc-list-item>`)}
            </mwc-list>
            </div>
        <!--      endregion -->
        </mwc-menu>
        <!-- endregion -->
        </div>
      </div>
      
      <div style="display: none">
        <div id="option-item-template">
            <div>
                <slot @slotchange="${this._updateOptionSlot()}" name="option-item"></slot>
            </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    const self = this;
    return {
      outlined: {type: Boolean, reflect: true},
      selectableItems: {
        type: Array, reflect: true, attribute: false,
        hasChanged: (val) => {
        }
      },
      selected: {
        type: Array,
        reflect: true,
        attribute: false,
      },
      options: {
        type: Array, reflect: true
      },
      multi: {type: Boolean, reflect: true, attribute: 'multi'},
      closeOnClick: {type: Boolean, reflect: true},
      label: {type: String, reflect: true},
      searchLabel: {type: String, reflect: true},
      value: {type: Array, reflect: true},
      isLoading: {type: Boolean, reflect: true, attribute: false},
      isOpen: {type: Boolean, reflect: true, attribute: false},
      isFocused: {type: Boolean, reflect: true, attribute: false},
      hasErrors: {type: Boolean, reflect: true, attribute: false},
      isSearching: {type: Boolean, reflect: true, attribute: false},
      searchValue: {type: String, reflect: true, attribute: false},
      pagination: {type: Object, reflect: true, attribute: false},
      disabled: {type: Boolean, reflect: true},
      clearable: {type: Boolean, reflect: true},
      searchInput: {type: Boolean, reflect: true},
      advancedSearch: {type: Boolean, reflect: true},
      noData: {type: Boolean, reflect: true, attribute: false},
      useOnlyPostParameters: {type: Boolean, reflect: true},
      postParameters: {type: Object, reflect: true},
      filter: {type: Object, reflect: true},
      labels: {type: Object, reflect: true},
      url: {type: String, reflect: true},
      /**
       * The property of the response object which has to be translated to the value property of the options.
       */
      itemValue: {
        type: String,
        reflect: true
      },

      /**
       * The property of the response object which has to be translated to the text property of the options.
       */
      itemText: {
        type: String,
        reflect: true
      },

      /**
       * The type of the http request.
       */
      requestType: {
        type: 'GET' | 'POST',
        reflect: true
      },

      /**
       * The headers of the http request.
       */
      requestHeaders: {
        type: Object,
        reflect: true
      },
    };
  }

  constructor() {
    super();
    this.selectableItems = [];
    this.selected = [];
    this.multi = false;
    this.value = [];
    this.options = [];
    this.isLoading = false;
    this.isOpen = false;
    this.isFocused = false;
    this.hasErrors = false;
    this.isSearching = false;
    this.disabled = false;
    this.label = '';
    this.searchLabel = 'search';
    this.closeOnClick = false;
    this.clearable = true;
    this.searchValue = '';
    this.searchInput = false;
    this.advancedSearch = false;
    this.pagination = {
      page: 1,
      pageSize: 15
    };
    this.itemText = 'text';
    this.itemValue = 'value';
    this.noData = false;
    this.filter = null;
    this.postParameters = null;
    this.useOnlyPostParameters = false;
    this.labels = null;
    this.url = '';
    this.requestType = 'GET';
    this.requestHeaders = {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*', // cors
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS', // cors
      'Content-Type': 'application/json',
      Authorization: window.sessionStorage.getItem('trusted')
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    console.log(changedProperties); // logs previous values
    console.dir(this.selectableItems); // logs current value
    this._updateOptionSlot();
  }

  connectedCallback() {
    super.connectedCallback()

    // sets the selectable items
    for (const item of this.options) {
      const index = this.selectableItems.find((s) => s[this.itemValue] === item[this.itemValue]);
      if (index > -1) {
        this.selected = this.selectableItems[index].selected;
        this.selectableItems[index] = this.cloneDeep(item);
        this.selectableItems[index].selected = selected;
        this.selectableItems = [...this.selectableItems];
      } else {
        let temp = this.cloneDeep(item);
        temp.selected = false;
        this.selectableItems = [...this.selectableItems, temp];
      }
    }

    // sets the default selected items
    for (const val of this.value) {
      this.selected = [...this.selected, this.cloneDeep(val)];
      this.updateSelectableItems();
    }

    // slots[1].addEventListener('slotchange', function(e) {
    //   let nodes = slots[1].assignedNodes();
    //   console.log('Element in Slot "' + slots[1].name + '" changed to "' + nodes[0].outerHTML + '".');
    // });
  }

  get optionsMenu() {
    return this.shadowRoot.querySelector('#optionsMenu');
  }

  get jvxList() {
    return this.shadowRoot.querySelector('#jvxList');
  }

  toggleMenu() {
    if (!this.optionsMenu.open) {
      if (!this.options || this.options.length === 0) {
        this.pagination.page = 1;
        this.selectableItems = [];
        this._getList();
      } else {
        this.optionsMenu.open = !this.optionsMenu.open;
      }
    } else {
      this.optionsMenu.open = !this.optionsMenu.open;
    }
  }

  onMenuToggled() {
    this.isOpen = this.optionsMenu.open;
    this.isFocused = this.optionsMenu.open;
  }

  select(item) {
    const index = this.selected.findIndex(i => i[this.itemValue] === item[this.itemValue]);
    if (index > -1) {
      const temp = [...this.selected]
      temp.splice(index, 1);
      this.selected = [...temp];
    } else {
      if (!this.multi) {
        this.selected.length = 0;
      }
      this.selected = [...this.selected, this.cloneDeep(item)];
    }
    if (this.closeOnClick && !this.multi) {
      this.optionsMenu.open = false;
    }
    this.updateSelectableItems();

    const event = new CustomEvent('input', {
      detail: this.selected
    });
    //TODO: rimuovere per pubblicazione
    this.value = this.selected;
    // FINE TODO

    this.dispatchEvent(event);
  }

  showAdvancedSearch() {
    const event = new CustomEvent('showAdvancedSearch');
    this.dispatchEvent(event);
  }

  updateSelectableItems() {
    for (let i = 0; i < this.selectableItems.length; i++) {
      const item = this.selectableItems[i];
      item.selected = this.selected.findIndex((v) => v[this.itemValue] === item[this.itemValue]) > -1;
      this.selectableItems[i] = {...item};
    }
    this.selectableItems = [...this.selectableItems];
  }


  get listOptions() {
    return this.shadowRoot.querySelector('.list-option');
  }

  get multiValue() {
    return this.selected.filter((v) => this.multi);
  }

  get singleValue() {
    return this.selected.filter((v) => !this.multi);
  }

  cloneDeep(el) {
    let ret = {};
    for (let key of Object.keys(el)) {
      if (!!el[key] && typeof el[key] === 'object') {
        ret[key] = this.cloneDeep(el[key]);
      } else if (Array.isArray(el[key])) {
        ret[key] = [];
        for (const val of el[key]) {
          ret[key].push(this.cloneDeep(val));
        }
      } else {
        ret[key] = el[key];
      }
    }
    return ret;
  }

  onClose(item) {
  }

  _updateOptionSlot() {
    let slot = this.shadowRoot.querySelector('slot[name="option-item"]');
    if (!!slot && slot.assignedNodes().length > 0) {
      for (const item of this.selectableItems) {
        const optionTemplate = slot.assignedNodes()[0];
        const nodes = this.shadowRoot.querySelectorAll('.list-option-content');
        for (const option of nodes) {
          if (option.dataset.value === item[this.itemValue].toString()) {
            option.innerHTML = '';
            option.appendChild(optionTemplate.cloneNode(true).childNodes[0]);
            this._replaceOptionProperties(option.childNodes, item)
          }
        }
      }
    }
  }

  _replaceOptionProperties(nodes, item) {
    const keys = Object.keys(item);

    for (const node of nodes) {
      this._setOriginalText(node);
    }
    for (const key of keys) {
      for (const node of nodes) {
        this._walkText(key, node, item, nodes);
      }
    }
  }

  _setOriginalText(node) {
    if (node.nodeType === 3) {
      node.parentNode.setAttribute('data-original-text', node.data);
    }
    if (node.nodeType === 1 && node.nodeName !== "SCRIPT") {
      for (var i = 0; i < node.childNodes.length; i++) {
        this._setOriginalText(node.childNodes[i]);
      }
    }
  }

  _walkText(key, node, item, nodes) {
    if (node.nodeType === 3) {
      if (node.parentNode.dataset.originalText.includes('[[option.' + key + ']]')) {
        node.parentNode.setAttribute('data-item-value', item[this.itemValue]);
        node.data = node.parentNode.dataset.originalText.replace('[[option.' + key + ']]', item[key]);
      }
    }
    if (node.nodeType === 1 && node.nodeName !== "SCRIPT") {
      for (var i = 0; i < node.childNodes.length; i++) {
        this._walkText(key, node.childNodes[i], item, nodes);
      }
    }
  }


  _onSearch() {
    if (this.isOpen) {
      const timeout = setTimeout(() => {
        if (!this.isSearching) {
          this.isSearching = true;
          this.pagination.page = 1;
          this.selectableItems = [];
          this._getList();
        } else {
          clearTimeout(timeout);
        }
      }, 1000);
    }
  }

  /**
   * Chiamata backend
   * @private
   */
  _getList() {
    this.noData = false;

    let data = this.postParameters || {};

    if (!this.useOnlyPostParameters) {
      Object.assign(data, {
        name: this.searchValue,
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        filter: !!this.filter && (typeof this.filter === 'object' || this.filter.length > 0) ? JSON.stringify(this.filter) : null
      });
    }

    return new Promise((resolve, reject) => {
      this.isLoading = true;
      if (typeof this.url === 'undefined' || this.url === null) {
        reject();
      }

      axios({
        url: this.url,
        method: this.requestType,
        mode: 'no-cors', // cors
        headers: this.requestHeaders,
        withCredentials: true,
        credentials: 'same-origin', // cache: 'default',
        data: data
      }).then(response => {
        if (typeof response.data.invalidJwt === 'undefined') {
          const event = new CustomEvent('response', {
            detail: response.data
          });
          this.dispatchEvent(event);
          if (Array.isArray(response.data.message) && response.data.message.length > 0) {
            this._mapResponse(response.data.message);
          } else {
            this.noData = true;
          }
          this.pagination.page++;
          this.totalRows = response.data.totalRows;
          this.optionsMenu.open = true;
          resolve(response.data);
        } else {
          const event = new CustomEvent('invalid-jwt', {
            detail: response.data
          });
          this.dispatchEvent(event);
          reject();
        }
      }).catch(e => {
        const event = new CustomEvent('error', {
          detail: e
        });
        this.dispatchEvent(event);
        reject(e);
      })
        .finally(() => {
          setTimeout(() => {
            this.isSearching = false;
            this.isLoading = false;
          }, 1000);
        });
    });
  }

  _mapResponse(newItems) {
    for (const tempItem of newItems) {
      const item = JSON.parse(JSON.stringify(tempItem));
      if (!!this.labels && Object.keys(this.labels).length > 0) {
        for (const key of Object.keys(this.labels)) {
          if (item[key]) {
            item[this.labels[key]] = item[key];
          }
        }
      }
      item.selected = this.value.findIndex(m => m[this.itemValue] === item[this.itemValue]) !== -1;
      this.selectableItems.push(item);
    }
  }


  static get styles() {

    return css`
        jvx-material-input{
        --jvx-material-input-primary:var(--jvx-multiselect-primary, blue);
        --jvx-material-input-accent:var(--jvx-multiselect-accent, green);
        --jvx-material-input-error:var(--jvx-multiselect-error, red);
        }
        paper-chip{
        --paper-chip-background-color:var(--jvx-multiselect-primary, blue);
        --paper-chip-icon-text-color:#fff;
        }
    mwc-list{
--mdc-theme-primary: var(--jvx-multiselect-primary, blue);

}
.jvx-multiselect__list-container{
max-height: 300px;
overflow: auto;
}
        mwc-list-item{
        height: auto;
        min-height: 40px;
        padding: 10px 20px;
        } 
 #optionsMenu {
display: block;
position: relative;
     --mdc-menu-min-width: 100px;
     --mdc-menu-width: 100%;
     --mdc-menu-item-height: 30px;

     /* inherits the styles of mwc-list internally */
     --mdc-theme-primary: blue;
     --mdc-list-vertical-padding: 0px;
     --mdc-list-side-padding: 30px;
     }
     
     #optionsMenu .optionsMenu__search-input-container{
     width: 100%;
     display: flex;
     justify-content: center;
     padding: 5px 20px 0;
     box-sizing: border-box;
     }
     #optionsMenu .optionsMenu__search-input-container mwc-icon-button {
        --mdc-icon-size: 16px;
        --mdc-icon-button-size: 24px;
      }
     
.jvx-multiselect {
	 padding-top: 12px;
	 margin-top: 4px;
	 position: relative;
	 color: var(--jvx-multiselect-primary, black);
}
 .jvx-multiselect.jvx-multiselect-error {
	 color: var(--jvx-multiselect-warn, red);
}
 .jvx-multiselect.jvx-multiselect-isFocused {
	 color: var(--jvx-multiselect-accent, green);
}
 .jvx-multiselect.jvx-multiselect-isFocused .input-container::after {
	 transform: scaleX(1);
}
 .jvx-multiselect.jvx-multiselect-isOpen .input-container__arrow {
	 transform: rotate(180deg);
}
 .jvx-multiselect.jvx-multiselect-has-state .input-container::before {
	 border-color: currentColor;
}
 .jvx-multiselect.jvx-multiselect-has-state .input-container label, .jvx-multiselect.jvx-multiselect-has-state .input-container .input-container__arrow > * {
	 color: currentColor;
}
 .jvx-multiselect:not(.jvx-multiselect-has-state) .input-container:hover::before {
	 border-color: rgba(0, 0, 0, 0.87);
}
 .jvx-multiselect.jvx-multiselect-disabled {
	 pointer-events: none;
	 color: rgba(0, 0, 0, 0.42);
}
 .jvx-multiselect.jvx-multiselect-disabled .input-container::before {
	 border-image: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.38) 0, rgba(0, 0, 0, 0.38) 2px, transparent 0, transparent 4px) 1 repeat;
}
 
 .input-container {
     min-height: 37px;
     position: relative;
     -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     -moz-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     -ms-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     -o-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     }
 .input-container::before, .input-container::after {
     bottom: -1px;
     content: "";
     left: 0;
     position: absolute;
     transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     width: 100%;
     }
 .input-container::before {
     border-color: rgba(0, 0, 0, 0.42);
     border-style: solid;
     border-width: thin 0 0;
     }
 .input-container::after {
     transform: scaleX(0);
     border-style: solid;
     border-width: thin 0;
     }
 .input-container label {
     position: absolute !important;
     -webkit-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     -moz-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     -ms-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     -o-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     line-height: 2.3;
     color: currentColor;
     }
      .input-container .input-container__remove-button-container{
      height: 37px;
      display: flex;
      align-items: center;
      }
      .input-container .input-container__remove-button{
      cursor: pointer;
      font-size: 15px;
      }
 .input-container .input-container__arrow > * {
     transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     }
 .input-container.selection-active label, .input-container.menu-is-open label {
     transform: translateY(-18px) scale(0.75) translateX(-6px);
     transform-origin: 20px;
     display: inline;
     line-height: 21px;
     color: var(--jvx-multiselect-accent, green);
     }
 .input-container .input-container__selected-container {
     display: flex;
     width: 100%;
     position: relative;
     left: 0;
     top: 0;
     min-height: 32px;
     }
 .input-container .input-container__selected-container .input-container__selected {
     color: beige;
     flex: 1 1 100%;
     left: 0;
     min-height: 100%;
     display: flex;
     align-items: center;
     max-height: 100%;
     flex-wrap: wrap;
     }
 .input-container .input-container__selected-container .input-container__selected .input__item {
     opacity: 1;
     }
 .input-container .input-container__selected-container .input-container__arrow {
     width: 24px;
     height: 100%;
     display: flex;
     align-self: center;
     align-items: center;
     transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
     }
 .input-container .input-container__selected-container .input-container__arrow .lds-ring {
     display: inline-block;
     position: relative;
     width: 24px;
     height: 24px;
     }
 .input-container .input-container__selected-container .input-container__arrow .lds-ring div {
     box-sizing: border-box;
     display: block;
     position: absolute;
     width: 16px;
     height: 16px;
     margin: 4px;
     border: 2px solid var(--jvx-multiselect-accent, green);
     border-radius: 50%;
     animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
     border-color: var(--jvx-multiselect-accent, green) transparent transparent transparent;
     }
 .input-container .input-container__selected-container .input-container__arrow .lds-ring div:nth-child(1) {
     animation-delay: -0.45s;
     }
 .input-container .input-container__selected-container .input-container__arrow .lds-ring div:nth-child(2) {
     animation-delay: -0.3s;
     }
 .input-container .input-container__selected-container .input-container__arrow .lds-ring div:nth-child(3) {
     animation-delay: -0.15s;
     }

  `;
  }
}

window.customElements.define('jvx-multiselect', JvxMultiselect);
