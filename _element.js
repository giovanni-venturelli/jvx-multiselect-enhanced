import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `jvx-multiselect`
 * a multiselect
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class JvxMultiselect extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'jvx-multiselect',
      },
    };
  }
}

window.customElements.define('jvx-multiselect', JvxMultiselect);
