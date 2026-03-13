import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { IShorty } from '../types/IShorty';

@customElement('shorty-footer')
export class ShortyFooter extends LitElement {
  static override styles = css`
    .shorty-footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      gap: 1em;
      background: color-mix(in srgb, var(--shorty-primary-color) 90%, black 1%);
      margin-top: auto;
      padding: 0.5em 1em;
      border-bottom-left-radius: var(--shorty-content-border-radius);
      border-bottom-right-radius: var(--shorty-content-border-radius);
    }

    .shorty-footer .key {
      padding: 0.2em 0.25em;
      fill: var(--shorty-text-color);
      background: var(--shorty-key-background-color);
      border-radius: var(--shorty-key-border-radius);
      font-size: var(--shorty-key-font-size);
      box-sizing: content-box;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      color: var(--shorty-text-color);
      white-space: nowrap;
      line-height: 1;
      text-align: center;
    }

    .shorty-footer .help {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      font-size: var(--shorty-key-font-size);
      color: var(--shorty-text-color);
      white-space: nowrap;
      line-height: 1;
      text-align: center;
      margin: 0;
      padding: 0;
    }

    .shorty-footer .line {
      width: 1px;
      height: 0.8em;
      background: var(--shorty-secondary-text-color);
    }
  `;

  @property()
  readonly action: IShorty | undefined;

  private _showHints(action: IShorty) {
    const hints: Array<{ keys: string[]; label: string }> = [];

    if (this._actionHasChildren()) {
      hints.push({ keys: ['⏎'], label: 'Open ' + action.id });
    } else {
      hints.push({ keys: ['⏎'], label: 'Select ' + action.id });
    }

    return hints;
  }

  private _actionHasChildren(): boolean {
    return !!this.action?.children?.length;
  }

  override render() {
    return this.action
      ? html`
          <div class="shorty-footer">
            ${this._showHints(this.action).map(
              hint => html`
                <div>
                  <span class="help">${hint.label}</span>
                  <span class="key">${hint.keys}</span>
                </div>
              `,
            )}
            <div class="line"></div>
            <div>
              <p class="help">Actions</p>
              <div class="key">⌘</div>
              <div class="key">⇧</div>
              <div class="key">K</div>
            </div>
          </div>
        `
      : html` <div>??</div>`;
  }
}
