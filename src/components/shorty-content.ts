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

            border-top: 1px solid rgb(239, 241, 244);
            border-bottom: 1px solid rgb(239, 241, 244);
        }
    `
    @property()
    data: IShorty[] = [];

    @property({type: Number})
    selectedIndex = 0;

    override render() {
        return html`
            <div class="shorty-body">
                ${this.data.map((shorty, index) => {
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