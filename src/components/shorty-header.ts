import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

@customElement('shorty-header')
export class ShortyHeader extends LitElement {
  static override styles = css`
    /* noinspection CssUnresolvedCustomProperty */

    .shorty-header {
      display: flex;
      flex-direction: column;
      row-gap: 1.25em;

      padding: 1.25em;

      background: var(--shorty-primary-color);

      border-top-left-radius: var(--shorty-content-border-radius);
      border-top-right-radius: var(--shorty-content-border-radius);
    }

    .breadcrumb-list {
      float: left;
      display: flex;
      flex-direction: row;
      gap: 0.5em;
    }

    /* noinspection CssUnresolvedCustomProperty */

    .breadcrumb-list button {
      margin: 0;
      padding: 2px 4px;

      background: var(--shorty-key-background-color);
      color: var(--shorty-text-color);
      border: none;

      border-radius: var(--shorty-key-border-radius);
      font-size: var(--shorty-key-font-size);
      text-align: center;
    }

    .search-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: .8em;
      float: right;
    }

    /* noinspection CssUnresolvedCustomProperty */

    .search-container input {
      border: none;
      background: none;
      outline: none;

      width: 100%;

      font-size: 1em;
      color: var(--shorty-text-color);
    }

    .search-container mwc-icon {
      color: var(--shorty-secondary-text-color);
      font-size: var(--shorty-action-icon-size);
    }
  `;

  @property({ type: Array })
  readonly breadcrumbs: string[] = [];

  @property({ type: String })
  readonly placeholder: string = '';

  @property({ type: String })
  readonly search: string = '';

  public focusSearch() {
    this._inputRef.value?.focus();
  }

  private _handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: { search: input.value },
        bubbles: false,
        composed: false,
      }),
    );
  }

  private _inputRef = createRef<HTMLInputElement>();

  override firstUpdated() {
    this.focusSearch();
  }

  override render() {
    return html`
      <div class="shorty-header">
        <div class="breadcrumb-list">
          ${this.breadcrumbs.map(breadcrumb => html` <button>${breadcrumb}</button> `)}
        </div>
        <div class="search-container">
          <mwc-icon>search</mwc-icon>
          <input
            type="text"
            placeholder="${this.placeholder}"
            spellcheck="false"
            autocomplete="off"
            name="search"
            @input=${this._handleInput}
            .value=${this.search}
            ${ref(this._inputRef)}
          />
        </div>
      </div>
    `;
  }
}
