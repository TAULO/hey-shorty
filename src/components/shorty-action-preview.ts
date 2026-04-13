import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('shorty-action-preview')
export class ShortyActionPreview extends LitElement {
  static override styles = css`
    :host {
      position: absolute;
      bottom: 0;
      left: 100%;
      margin-left: 1em;
      padding: .5em;
      width: 250px;
      min-height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5em;
      background-color: var(--shorty-primary-color);
      box-shadow: var(--shorty-content-shadow);
      color: var(--shorty-text-color);
      font-size: 1em;

      animation: preview-enter 0.25s ease both;
      animation-delay: 1s;
    }

    @keyframes preview-enter {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .shorty-action-preview {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      animation: content-fade 0.2s ease both;
    }

    @keyframes content-fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  @property({ type: String })
  readonly preview!: string;

  override render() {
    return html`<div class="shorty-action-preview">${unsafeHTML(this.preview)}</div>`;
  }
}
