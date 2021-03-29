import {Menu} from '@material/mwc-menu';
import {MenuBase} from '@material/mwc-menu/mwc-menu-base';
import {MenuSurface} from '@material/mwc-menu/mwc-menu-surface';
import {css, html, LitElement} from 'lit-element';

class JvxMenu extends MenuBase {

  static get properties() {
    return {
      ...super.properties,
      position: 'above' | 'below'
    }
  }

  constructor() {
    super();
    this.position = 'below'
  }

}


class JvxSurface extends MenuSurface {
  static get styles() {
    return [
      super.styles,
      css`
        /* my stylings */
      `
    ];
  }
  constructor(){
    super();

  }
}

window.customElements.define('jvx-menu', JvxMenu);
window.customElements.define('jvx-surface', JvxSurface);
