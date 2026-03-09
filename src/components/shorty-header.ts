import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";

@customElement('shorty-header')
export class ShortyHeader extends LitElement {
    @property({type: Array})
    breadcrumbs: string[] = [];

    @property({type: String})
    placeholder: string = '';

    @property({type: String})
    search = '';

    static override styles = css`
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

        .breadcrumb-list button {
            margin: 0;
            padding: 2px 4px;

            background: var(--shorty-key-background-color);
            color: var(--shorty-key-text-color);
            border: none;

            border-radius: var(--shorty-key-border-radius);
            font-size: var(--shorty-key-font-size);
            text-align: center;
        }

        .search-container {
            float: right;
        }

        .search-container input {
            border: none;
            background: none;
            outline: none;

            width: 100%;

            font-size: 1em;
            color: var(--shorty-text-color);
        }
    `

    override render() {
        return html`
            <div class="shorty-header">
                <div class="breadcrumb-list">
                    ${this.breadcrumbs.map(breadcrumb => html`
                        <button>${breadcrumb}</button>
                    `)}
                </div>
                <div class="search-container">
                    <input
                            type="text"
                            placeholder="${this.placeholder}"
                            @input=${(e: Event) => {
            this.dispatchEvent(new CustomEvent('search-changed', {
                detail: (e.target as HTMLInputElement).value,
                bubbles: true,
                composed: true,
            }));
        }}
                </
                >
            </div>
            </div>
        `;
    }
}
