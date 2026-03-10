import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import './shorty-key'

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
            background-color: color-mix(in srgb, var(--shorty-primary-color) 90%, var(--shorty-secondary-color) 4%);
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

    @property({type: String})
    name: string = '';

    @property({type: String})
    icon: string = '';

    @property({type: Array})
    hotkeys: string[] = [];

    @property({type: Boolean})
    selected: boolean = false;

    @property({type: Boolean})
    hovered: boolean = false;

    override render() {
        return html`
            <div class="shorty-action ${this.selected ? 'action-selected' : ''}">
                <mwc-icon class="action-icon">${this.icon || 'question_mark'}</mwc-icon>
                <p class="action-name">
                    ${this.name}
                </p>
                <div class="action-hotkeys">
                    ${this.hotkeys && this.hotkeys.length > 0 ?
            html`
                                ${this.hotkeys.map(hotkey => html`
                                    <shorty-key hotkey="${hotkey}"></shorty-key>
                                `)}
                            ` : undefined}
                </div>
            </div>
        `
    }
}