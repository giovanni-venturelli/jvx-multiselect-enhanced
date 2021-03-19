import {axios} from '@bundled-es-modules/axios';
import '@material/mwc-button';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-menu';
import '@material/mwc-textfield';
import 'jvx-material-input';
import {css, html, LitElement} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {repeat} from 'lit-html/directives/repeat';
import 'paper-chip';

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
            'jvx-multiselect-multi': this.multi,
            'jvx-multiselect-flat-round': this.flatRound,
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
            })}>

                <label>${this.label}</label>
                <div class="input-container__selected-container" @click="${this._toggleMenu}">
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
                            </mwc-icon>
                        </div>` : html``
                    }
                    <!--- endregion -->
                    <!-- region arrow icon -->
                    <div class="input-container__arrow">
                        ${!this.isLoading ? html`
                            <mwc-icon>expand_more
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
            <mwc-menu fullwidth id="optionsMenu" @closed="${this._onMenuToggled}" @opened="${this._onMenuToggled}">

                <!-- region search input -->
                <div class="optionsMenu__search-input-container">
                    ${this.searchInput ? html`
                        <jvx-material-input
                                .flatRound="${this.flatRound}"
                                placeholder="${this.searchLabel}"
                                type="text"
                                @input="${this._onSearch}"
                                background-color="transparent"
                                class="ma-0 pa-0 jvx-multiselect-search-field"
                                flat
                                @click:append="$emit('showAdvancedSearch')"
                                value="${this.searchValue}">
                            ${this.advancedSearch ? html`
                                <div slot="append">
                                    <mwc-icon-button id="advanced-search-button" icon="more_vert"
                                                     @click="${this._showAdvancedSearch}">
                                    </mwc-icon-button>
                                </div>` : html``}
                        </jvx-material-input>` : html``}

                </div>
                <!-- endregion -->
                <!--       region list-->
                <div class="jvx-multiselect__list-container">
                    <mwc-list multi="${this.multi}">
                        ${repeat(this.selectableItems, item => item[this.itemValue], (item, index) => html`
                            <mwc-list-item class="list-option" .selected="${item.selected}"
                                           .activated="${item.selected}" value="${item[this.itemValue]}"
                                           @click="${(e) => {
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
            <slot @slotchange="${this._updateOptionsSlot()}" name="options"></slot>
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
      hasErrors: {type: Boolean, reflect: true},
      isSearching: {type: Boolean, reflect: true, attribute: false},
      searchValue: {type: String, reflect: true, attribute: false},
      pagination: {type: Object, reflect: true, attribute: false},
      disabled: {type: Boolean, reflect: true},
      clearable: {type: Boolean, reflect: true},
      searchInput: {type: Boolean, reflect: true},
      advancedSearch: {type: Boolean, reflect: true},
      noData: {type: Boolean, reflect: true, attribute: false},
      totalRows: {type: Number, reflect: true, attribute: false},
      useOnlyHttpParameters: {type: Boolean, reflect: true},
      httpParameters: {type: Object, reflect: true},
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
      flatRound: {
        type: Boolean,
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
    this.httpParameters = null;
    this.useOnlyHttpParameters = false;
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
    this.flatRound = false;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    this._updateOptionSlot(changedProperties);
  }

  connectedCallback() {
    super.connectedCallback()
    // sets the selectable items
    for (const item of this.options) {
      const index = this.selectableItems.find((s) => s[this.itemValue] === item[this.itemValue]);
      if (index > -1) {
        this.selected = this.selectableItems[index].selected;
        this.selectableItems[index] = this._cloneDeep(item);
        this.selectableItems[index].selected = selected;
        this.selectableItems = [...this.selectableItems];
      } else {
        let temp = this._cloneDeep(item);
        temp.selected = false;
        this.selectableItems = [...this.selectableItems, temp];
      }
    }

    // sets the default selected items
    for (const val of this.value) {
      this.selected = [...this.selected, this._cloneDeep(val)];
      this._updateSelectableItems();
    }


    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        //Detect <img> insertion
        if (mutation.addedNodes.length) {
          console.info('Node added: ', mutation.addedNodes[0])
        }
      })
    })

    observer.observe(this, {childList: true})

    // slots[1].addEventListener('slotchange', function(e) {
    //   let nodes = slots[1].assignedNodes();
    //   console.log('Element in Slot "' + slots[1].name + '" changed to "' + nodes[0].outerHTML + '".');
    // });
  }

  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));
    this.scrollingContent.addEventListener('scroll', (e) => {
      this._handleScroll(e);
    });
  }

  _handleScroll(e) {
    if (this.isLoading) {
      e.preventDefault();
      e.stopPropagation();
    } else if (this.scrollingContent.scrollTop >= (this.scrollingContent.scrollHeight - this.scrollingContent.offsetHeight)) {

      const event = new CustomEvent('scrollEnd');
      this.dispatchEvent(event);

      if (this.selectableItems.length < this.totalRows) {
        this._getList();
      }
    }
  }

  get scrollingContent() {
    return this.shadowRoot.querySelector('.jvx-multiselect__list-container');
  }

  get optionsMenu() {
    return this.shadowRoot.querySelector('#optionsMenu');
  }

  get jvxList() {
    return this.shadowRoot.querySelector('#jvxList');
  }


  _toggleMenu() {
    if (!this.optionsMenu.open) {
      if ((!this.options || this.options.length === 0) && this.url && this.url.length > 0) {
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

  _onMenuToggled() {
    this.isOpen = this.optionsMenu.open;
    this.isFocused = this.optionsMenu.open;
    let event = new CustomEvent('jvx-menu-closed');
    if(this.optionsMenu.open){
      event = new CustomEvent('jvx-menu-opened');
    }
    this.dispatchEvent(event);
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
      this.selected = [...this.selected, this._cloneDeep(item)];
    }
    if (this.closeOnClick && !this.multi) {
      this.optionsMenu.open = false;
    }
    this._updateSelectableItems();

    const event = new CustomEvent('input', {
      detail: this.selected
    });
    //TODO: rimuovere per pubblicazione
    this.value = this.selected;
    // FINE TODO

    this.dispatchEvent(event);
  }

  _showAdvancedSearch() {
    const event = new CustomEvent('showAdvancedSearch');
    this.dispatchEvent(event);
  }

  _updateSelectableItems() {
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

  _cloneDeep(el) {
    let ret = {};
    for (let key of Object.keys(el)) {
      if (!!el[key] && typeof el[key] === 'object') {
        ret[key] = this._cloneDeep(el[key]);
      } else if (Array.isArray(el[key])) {
        ret[key] = [];
        for (const val of el[key]) {
          ret[key].push(this._cloneDeep(val));
        }
      } else {
        ret[key] = el[key];
      }
    }
    return ret;
  }

  onClose(item) {
  }

  _updateOptionSlot(e) {
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

  _updateOptionsSlot() {
    let slot = this.shadowRoot.querySelector('slot[name="options"]');
    if (!!slot && slot.assignedNodes().length > 0) {
      const nodes = slot.assignedNodes();
      for (let n of nodes) {
        for (let child of n.children) {
          if (this.selectableItems.findIndex(o => o[this.itemValue] === child.getAttribute('value')) === -1) {
            let newOption = {};
            newOption[this.itemValue] = child.getAttribute('value');
            newOption[this.itemText] = child.getAttribute('text');
            newOption.selected = this.value.findIndex(m => m[this.itemValue] === newOption[this.itemValue]) !== -1;
            this.selectableItems.push(newOption);
          }
        }
      }
      // for (const item of this.selectableItems) {
      //   const optionTemplate = slot.assignedNodes()[0];
      //   const nodes = this.shadowRoot.querySelectorAll('.list-option-content');
      //   for (const option of nodes) {
      //     if (option.dataset.value === item[this.itemValue].toString()) {
      //       option.innerHTML = '';
      //       option.appendChild(optionTemplate.cloneNode(true).childNodes[0]);
      //       this._replaceOptionProperties(option.childNodes, item)
      //     }
      //   }
      // }
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
      for (const akey of Object.keys(node.parentNode.attributes)) {
        node.parentNode.setAttribute(node.parentNode.attributes[akey].name, node.parentNode.getAttribute(node.parentNode.attributes[akey].name).replace('[[option.' + key + ']]', item[key]));

      }
    }
    if (node.nodeType === 1 && node.nodeName !== "SCRIPT") {
      for (var i = 0; i < node.childNodes.length; i++) {
        this._walkText(key, node.childNodes[i], item, nodes);
      }
    }
  }

  _onSearch(e) {
    if (this.isOpen) {
      const timeout = setTimeout(() => {
        if (!this.isSearching) {
          this.searchValue = e.detail ? e.detail.value : '';
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

    let data = this.httpParameters || {};
    if (!this.useOnlyHttpParameters) {
      Object.assign(data, {
        search: this.searchValue,
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

      let axiosOptions = {
        url: this.url,
        method: this.requestType,
        mode: 'no-cors', // cors
        headers: this.requestHeaders,
        withCredentials: true,
        credentials: 'same-origin', // cache: 'default',
        data: data
      };
      if (this.requestType === 'GET') {
        axiosOptions.params = data;
      }

      axios(axiosOptions).then(response => {
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
      mwc-menu {
        --mdc-theme-surface: var(--jvx-multiselect-background-color, #fff);

      }

      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      jvx-material-input {
        --jvx-multiselect-color: var(--jvx-multiselect-color, #000);
        --jvx-material-input-primary: var(--jvx-multiselect-primary, blue);
        --jvx-material-input-accent: var(--jvx-multiselect-accent, green);
        --jvx-material-input-error: var(--jvx-multiselect-error, red);
        --jvx-material-input-background: var(--jvx-multiselect-background-color, #fff);
      }

      .jvx-multiselect-flat-round jvx-material-input {
        --jvx-material-input-background: var(--jvx-multiselect-background-color, #D5D5D5)
      }

      paper-chip {
        --paper-chip-background-color: var(--jvx-multiselect-primary, blue);
        --paper-chip-icon-text-color: #fff;
      }

      .jvx-multiselect.jvx-multiselect-multi.jvx-multiselect-flat-round paper-chip {
        top: 3px;
        position: relative;
      }

      mwc-list {
        --mdc-theme-primary: var(--jvx-multiselect-primary, blue);

      }

      .jvx-multiselect__list-container {
        max-height: 300px;
        overflow: auto;
      }

      mwc-list-item {
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

      #optionsMenu .optionsMenu__search-input-container {
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
        color: var(--jvx-multiselect-color, black);
      }

      .jvx-multiselect.jvx-multiselect-error {
        color: var(--jvx-multiselect-warn, red);
      }

      .jvx-multiselect.jvx-multiselect-isFocused {
        color: var(--jvx-multiselect-accent, green);
      }

      .jvx-multiselect.jvx-multiselect-isFocused:not(.jvx-multiselect-flat-round) .input-container::after {
        transform: scaleX(1);
      }

      .jvx-multiselect.jvx-multiselect-isOpen .input-container__arrow {
        transform: rotate(180deg);
      }

      .jvx-multiselect.jvx-multiselect-has-state:not(.jvx-multiselect-flat-round) .input-container::before {
        border-color: currentColor;
      }

      .jvx-multiselect.jvx-multiselect-has-state .input-container label, .jvx-multiselect.jvx-multiselect-has-state .input-container .input-container__arrow > * {
        color: currentColor;
      }

      .jvx-multiselect:not(.jvx-multiselect-has-state):not(.jvx-multiselect-flat-round) .input-container:hover::before {
        border-color: rgba(0, 0, 0, 0.87);
      }

      .jvx-multiselect.jvx-multiselect-disabled {
        pointer-events: none;
        color: rgba(0, 0, 0, 0.42);
      }

      .jvx-multiselect.jvx-multiselect-disabled:not(.jvx-multiselect-flat-round) .input-container::before {
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

      .jvx-multiselect:not(.jvx-multiselect-flat-round) .input-container::before, .jvx-multiselect:not(.jvx-multiselect-flat-round) .input-container::after {
        bottom: -1px;
        content: "";
        left: 0;
        position: absolute;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        width: 100%;
      }

      .jvx-multiselect:not(.jvx-multiselect-flat-round) .input-container::before {
        border-color: rgba(0, 0, 0, 0.42);
        border-style: solid;
        border-width: thin 0 0;
      }

      .jvx-multiselect:not(.jvx-multiselect-flat-round) .input-container::after {
        transform: scaleX(0);
        border-style: solid;
        border-width: thin 0;
      }

      .jvx-multiselect.jvx-multiselect-flat-round .input-container {
        background: var(--jvx-multiselect-input-background-color, #D5D5D5);
        padding: 2.5px 0.75em;
        height: auto;
        min-height: var(--jvx-material-input-height, 44px);
        box-sizing: border-box;
        border-radius: 4px;
      }

      .input-container label {
        position: absolute !important;
        -webkit-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        -moz-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        -ms-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        -o-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        line-height: var(--jvx-material-input-height, 44px);
        color: currentColor;
      }

      .input-container .input-container__remove-button-container {
        height: 100%;
        display: flex;
        align-self: center;
        align-items: center;
      }

      .input-container .input-container__remove-button {
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

      .jvx-multiselect.jvx-multiselect-flat-round .input-container.selection-active label,
      .jvx-multiselect.jvx-multiselect-flat-round .input-container.menu-is-open label {
        transform: translateY(-20px) scale(0.75) translateX(-20px);
      }

      .input-container .input-container__selected-container {
        display: flex;
        width: 100%;
        position: relative;
        left: 0;
        top: 0;
        min-height: var(--jvx-material-input-height, 37px);
      }

      .jvx-multiselect:not(.jvx-multiselect-multi) .input-container .input-container__selected-container {
        padding-top: 2px;
      }

      .input-container .input-container__selected-container .input-container__selected {
        color: inherit;
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
