import {Menu} from '@material/mwc-menu';
import {MenuBase} from '@material/mwc-menu/mwc-menu-base';
import {MenuSurface} from '@material/mwc-menu/mwc-menu-surface';
import {css, html, LitElement} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {styleMap} from 'lit-html/directives/style-map';

class JvxMenu extends MenuBase {

  static get properties() {
    return {
      ...super.properties,
      position: {type: 'above' | 'below', reflect: true}
    }
  }

  render() {
    const itemRoles = this.innerRole === 'menu' ? 'menuitem' : 'option';
    return html`
        <jvx-surface
                position=${this.position}
                ?hidden=${!this.open}
                .anchor=${this.anchor}
                .open=${this.open}
                .quick=${this.quick}
                .corner=${this.corner}
                .x=${this.x}
                .y=${this.y}
                .absolute=${this.absolute}
                .fixed=${this.fixed}
                .fullwidth=${this.fullwidth}
                .menuCorner=${this.menuCorner}
                class="mdc-menu mdc-menu-surface"
                @closed=${this.onClosed}
                @opened=${this.onOpened}
                @keydown=${this.onKeydown}>
            <mwc-list
                    rootTabbable
                    .innerRole=${this.innerRole}
                    .multi=${this.multi}
                    class="mdc-list"
                    .itemRoles=${itemRoles}
                    .wrapFocus=${this.wrapFocus}
                    .activatable=${this.activatable}
                    @action=${this.onAction}>
                <slot></slot>
            </mwc-list>
        </jvx-surface>`;
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

        .mdc-menu-surface.jvx-menu-surface__above {
          margin-top: calc(-100% + 365px);
          max-height: var(--mdc-menu-max-height, 300px) !important;
        }
      `
    ];
  }

  static get properties() {
    return {
      ...super.properties,
      position: {type: 'above' | 'below', reflect: true}
    }
  }

  constructor() {
    super();
    this.position = 'below';

  }

  render() {
    const classes = {
      'mdc-menu-surface--fixed': this.fixed,
      'mdc-menu-surface--fullwidth': this.fullwidth,
      'jvx-menu-surface__above': this.position==='above'

    };
    const styles = {
      'top': this.styleTop,
      'left': this.styleLeft,
      'right': this.styleRight,
      'bottom': this.styleBottom,
      'max-height': this.styleMaxHeight,
      'transform-origin': this.styleTransformOrigin,
    };
    return html`
        <div
                class="mdc-menu-surface jvx-menu-surface ${classMap(classes)}"
                style="${styleMap(styles)}"
                @keydown=${this.onKeydown}
                @opened=${this.registerBodyClick}
                @closed=${this.deregisterBodyClick}>
            <div class="jvx-menu-surface__content">
                <slot></slot>
            </div>
        </div>`;
  }
}

window.customElements.define('jvx-menu', JvxMenu);
window.customElements.define('jvx-surface', JvxSurface);
