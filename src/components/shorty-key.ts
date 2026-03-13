import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

@customElement('shorty-key')
export class ShortyKey extends LitElement {
  static override styles = css`
    .shorty-key {
      padding: 2px 4px;

      background: var(--shorty-key-background-color);
      color: var(--shorty-text-color);

      border-radius: var(--shorty-key-border-radius);
      font-size: var(--shorty-key-font-size);
      text-align: center;

      font-weight: lighter;
    }
  `;

  @property()
  hotkey: string = '';

  override render() {
    return html` <kdb class="shorty-key">${this.hotkey}</kdb> `;
  }
}
