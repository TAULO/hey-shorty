import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import './shorty-key'
import {IShorty} from "../types/IShorty";

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
            background-color: color-mix(in srgb, var(--shorty-primary-color) 90%, var(--shorty-secondary-color) 4%);
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
    `

    @property({type: Boolean})
    readonly selected: boolean = false;

    @property({type: Boolean})
    readonly hovered: boolean = false;

    @property({type: Object})
    readonly shorty!: IShorty;

    private _handleClick() {
        this.dispatchEvent(new CustomEvent('action', {
            detail: {action: this.shorty},
            bubbles: true,
            composed: true
        }));
    }

    override render() {
        return html`
            <div
                    class="shorty-action ${this.selected ? 'action-selected' : ''}"
                    @click=${this._handleClick}
            >
                <mwc-icon class="action-icon">${this.shorty.icon || 'question_mark'}</mwc-icon>
                <p class="action-name">
                    ${this.shorty.name}
                </p>
                <div class="action-hotkeys">
                    ${this.shorty.hotkeys && this.shorty.hotkeys.length > 0 ?
                            html`
                                ${this.shorty.hotkeys.map(hotkey => html`
                                    <shorty-key hotkey="${hotkey}"></shorty-key>
                                `)}
                            ` : undefined}
                </div>
            </div>
        `
    }
}