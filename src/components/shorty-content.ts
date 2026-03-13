import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { IShorty } from '../types/IShorty';
import './shorty-action';

@customElement('shorty-content')
export class ShortyBody extends LitElement {
  static override styles = css`
    .shorty-body {
      display: flex;
      flex-direction: column;
      padding: 0.5em 0;

      height: var(--shorty-actions-height);
      background-color: var(--shorty-primary-color);

      border-top: var(--shorty-border);
      border-bottom: var(--shorty-border);

      overflow-y: auto;
    }

    .shorty-body .no-results {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .shorty-body .no-results p {
      font-size: 0.9em;
      color: var(--shorty-secondary-text-color);
    }
  `;
  @property({ type: Array })
  readonly data: IShorty[] = [];

  @property({ type: Number })
  readonly selectedIndex = 0;

  private _actionFocused(index: number, $event: MouseEvent) {
    if (index !== -1 && index !== this.selectedIndex) {
      console.log('actionFocused', index);
      this.dispatchEvent(
        new CustomEvent('selected-index-changed', {
          detail: { index },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  override render() {
    return html`
      <div class="shorty-body">
        ${this.data.length === 0
          ? html`
              <div class="no-results">
                <p> No results found </p>
              </div>
            `
          : this.data.map((shorty, index) => {
              return html`
                <shorty-action
                .shorty="${shorty}"
                .selected="${this.selectedIndex === index}"
                @mouseover=${(event: MouseEvent) => this._actionFocused(index, event)}      
        "></shorty-action>
    `;
            })}
      </div>
    `;
  }
}
