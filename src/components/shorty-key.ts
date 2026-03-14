import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';

@customElement('shorty-key')
export class ShortyKey extends LitElement {
  static override styles = css`
    :host {
      --shorty-key-size: 22px;
      --shorty-key-font-weight: 200;
    }

    .shorty-key {
      justify-content: center;
      align-items: center;
      display: inline-flex;
      height: var(--shorty-key-size);
      min-width: var(--shorty-key-size);
      font-size: var(--shorty-key-font-size);
      color: var(--shorty-text-color);
      border-radius: var(--shorty-key-border-radius);
      font-weight: var(--shorty-key-font-weight);
      border: 1px solid #3f404d40;
      border-bottom-width: 2px;
      background-color: oklch(97.8% 0.005 297.73);
      text-align: center;
    }
  `;

  @property()
  hotkey: string = '';

  override render() {
    const keyMapper: Record<string, string> = {
      cmd: '⌘',
      ctrl: '⌃',
      option: '⌥',
      shift: '⇧',
      enter: '⏎',
    };

    const key: string = keyMapper[this.hotkey] || this.hotkey;

    return html` <kdb class="shorty-key">${key}</kdb> `;
  }
}
