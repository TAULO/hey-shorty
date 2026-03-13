import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import './shorty-key';
import { IShorty } from '../types/IShorty';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('shorty-action')
export class ShortyAction extends LitElement {
  static override styles = css`
    .shorty-action {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: var(--shorty-primary-color);

      padding: 0 1em;
    }

    .shorty-action:hover {
      cursor: pointer;
    }

    .action-selected {
      background-color: color-mix(
        in srgb,
        var(--shorty-primary-color) 90%,
        var(--shorty-secondary-color) 4%
      );
      box-shadow: inset 2px 0 0 0 var(--shorty-secondary-color);
    }

    .action-icon {
      display: flex;
      align-items: center;

      margin-right: 1em;

      font-size: var(--shorty-action-icon-size);
      color: var(--shorty-secondary-text-color);
    }

    .action-name {
      flex-grow: 1;
      color: var(--shorty-text-color);
    }

    .action-hotkeys {
      display: flex;
      flex-direction: row;
      gap: 0.2em;
    }

    .action-highlight {
      color: var(--shorty-secondary-color);
    }

    .action-children {
      display: flex;
      align-items: center;
      gap: 0.2em;
      margin: 0;
      padding: 0;
      font-size: var(--shorty-key-font-size);
      color: var(--shorty-text-color);
    }
  `;

  @property({ type: Boolean })
  readonly selected: boolean = false;

  @property({ type: Boolean })
  readonly hovered: boolean = false;

  @property({ type: Object })
  readonly action!: IShorty;

  private get _hasChildren(): boolean {
    return !!this.action?.children?.length;
  }
  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('action', {
        detail: { action: this.action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div
        class="shorty-action ${this.selected ? 'action-selected' : ''}"
        @click=${this._handleClick}
      >
        <mwc-icon class="action-icon">${this.action.icon || 'question_mark'}</mwc-icon>
        <p class="action-name"> ${unsafeHTML(this.action.name) ?? this.action.name} </p>
        <div class="action-hotkeys">
          ${this.action.hotkeys && this.action.hotkeys.length > 0
            ? html`
                ${this.action.hotkeys.map(
                  hotkey => html` <shorty-key hotkey="${hotkey}"></shorty-key> `,
                )}
              `
            : this._hasChildren
              ? html`
                  <div class="action-children">
                    <p
                      >${this.action.children?.length}
                      ${this.action.children && this.action.children.length > 1
                        ? 'items'
                        : 'item'}</p
                    >
                    <mwc-icon>chevron_right</mwc-icon>
                  </div>
                `
              : undefined}
        </div>
      </div>
    `;
  }
}
