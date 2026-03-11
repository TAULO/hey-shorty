import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {IShorty} from "../types/IShorty";
import './shorty-action'

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
    `
    @property({type: Array})
    data: IShorty[] = [];

    @property({type: Number})
    selectedIndex = 0;

    override render() {
        return html`
            <div class="shorty-body">
               
                ${
            this.data.length === 0 ? html`
                        <div class="no-results">
                            <p>
                                No results found
                            </p>
                        </div>
                    ` :
            this.data.map((shorty, index) => {
                            return html`
                                <shorty-action name="${shorty.name}" icon="${shorty.icon}"
                                               .hotkeys="${shorty.hotkeys}"
                                               .selected="${this.selectedIndex === index}"></shorty-action>
                            `
                        }
                )}
            </div>
        `;
    }
}