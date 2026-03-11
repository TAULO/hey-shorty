import {customElement, property} from "lit/decorators.js";
import {css, html, LitElement} from "lit";
import {IShorty} from "../types/IShorty";

@customElement('shorty-footer')
export class ShortyFooter extends LitElement {
    static override styles = css`
        .shorty-footer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: end;
            gap: 1em;
            background: color-mix(in srgb, var(--shorty-primary-color) 90%, black 1%);
            margin-top: auto;
            padding: 0.5em 1em;
            border-bottom-left-radius: var(--shorty-content-border-radius);
            border-bottom-right-radius: var(--shorty-content-border-radius);
        }

        .shorty-footer svg {
            display: block;
            width: 1em;
            height: 1em;
            padding: 0.15em 0.25em;
            fill: var(--shorty-text-color);
            background: var(--shorty-key-background-color);
            border-radius: var(--shorty-key-border-radius);
            box-sizing: content-box;
        }

        .shorty-footer .help {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: 0.35em;
            font-size: var(--shorty-key-font-size);
            color: var(--shorty-text-color);
            white-space: nowrap;
            line-height: 1;
        }
    `

    @property()
    action: IShorty | undefined;

    private _showHints() {
        const hints: Array<{ keys: string[], label: string }> = [
            {keys: ['↑', '↓'], label: 'navigate'},
        ];

        if (this._actionHasChildren()) {
            hints.push({keys: ['↵'], label: 'open'});
        } else {
            hints.push({keys: ['↵'], label: 'select'});
        }

        hints.push({keys: ['esc'], label: ''});

        return hints;
    }

    private _actionHasChildren(): boolean {
        return !!this.action?.children?.length;
    }


    override render() {
        return this.action ? html`
            <div class="shorty-footer">
                ${this._showHints().map(hint => html`
                    <span class="help">${hint.keys}</span>
                    <span class="help">${hint.label}</span>
                `)}
            </div>
        ` : html`
            <div>??</div>`

        return html`
            <div class="shorty-footer">
              <span class="help">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 1280">
                  <path d="M1013 376c0 73.4-.4 113.3-1.1 120.2a159.9 159.9 0 0 1-90.2 127.3c-20 9.6-36.7 14-59.2 15.5-7.1.5-121.9.9-255 1h-242l95.5-95.5 95.5-95.5-38.3-38.2-38.2-38.3-160 160c-88 88-160 160.4-160 161 0 .6 72 73 160 161l160 160 38.2-38.3 38.3-38.2-95.5-95.5-95.5-95.5h251.1c252.9 0 259.8-.1 281.4-3.6 72.1-11.8 136.9-54.1 178.5-116.4 8.6-12.9 22.6-40.5 28-55.4 4.4-12 10.7-36.1 13.1-50.6 1.6-9.6 1.8-21 2.1-132.8l.4-122.2H1013v110z"></path>
                </svg>
                to select
              </span>
                <span class="help">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                </svg>
                to navigate
              </span>
                <span class="help">
                <shorty-key hotkey="esc"></shorty-key>
                to close
              </span>
                <span class="help">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                        d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
                        clip-rule="evenodd"></path>
                </svg>
                move to parent
              </span>
            </div>
        `;
    }
}