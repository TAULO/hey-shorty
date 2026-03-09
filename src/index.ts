import {css, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import hotkeys from 'hotkeys-js';
import '@material/mwc-icon';
import {IShorty} from "./types/IShorty";

import './components/shorty-header';
import './components/shorty-content';
import './components/shorty-footer';

@customElement('hey-shorty')
export class HeyShorty extends LitElement {
    static override styles = css`
        :host {
            --shorty-width: 640px;
            --shorty-text-color: rgb(60, 65, 73);
            --shorty-font-size: 16px;
            --shorty-top: 20%;

            --shorty-key-border-radius: 0.25em;
            --shorty-key-background-color: rgb(239, 241, 244);
            --shorty-key-text-color: rgb(107, 111, 118);
            --shorty-key-font-size: 0.85em;

            --shorty-secondary-background-color: rgb(239, 241, 244);
            --shorty-secondary-text-color: rgb(107, 111, 118);

            --shorty-selected-background: rgb(248, 249, 251);

            --shorty-primary-color: #fff;
            --shorty-secondary-color: rgb(110, 94, 210);

            --shorty-content-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
            --shorty-content-border-radius: 0.5em;

            --shorty-actions-height: 300px;
            --shorty-footer-background: rgba(242, 242, 242, 0.4);
            --shorty-placeholder-color: #8e8e8e;
            --shorty-z-index: 99999;

            --shorty-action-icon-size: 1.2em;
        }

        /* noinspection CssUnresolvedCustomProperty */

        .shorty {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            top: var(--shorty-top);

            display: flex;
            flex-direction: column;

            min-height: 400px;
            max-width: var(--shorty-width);
            width: 600px; //TODO: remove this
            background-color: var(--shorty-primary-color);

            box-shadow: var(--shorty-content-shadow);
            border-radius: var(--shorty-content-border-radius);

            z-index: var(--shorty-z-index);
        }
    `

    @property({
        type: Array,
        hasChanged() {
            // DOCS TAKEN FROM <Ninja-Keys>
            // Forced to trigger changed event always.
            // Because of a lot of framework pattern wrap object with an Observer, like vue2.
            // That's why object passed to web component always same and no render triggered. Issue #9
            return true;
        },
    })
    data = [] as Array<IShorty>;

    @property({type: Array})
    breadcrumbs: Array<string> = [];

    @state()
    search = '';

    @property()
    placeholder = 'Search...';

    @property()
    hotkeys = 'cmd+k,ctrl+k';

    @property()
    navigationUpHotkey = 'up';

    @property()
    navigationDownHotkey = 'down';

    @property()
    closeShortyHotkey = 'esc';

    @property()
    navigationBackHotkey = 'backspace';

    @property()
    handleActionHotkey = 'enter';

    @property({type: Boolean})
    visible = false;

    @state()
    private _selectedIndex = 0;

    private _parentStack: Array<typeof this.data> = [];

    private _toggle() {
        this.visible = !this.visible;
    }

    private _handleInputSearch(e: Event) {
        this.search = (e.target as HTMLInputElement).value;
        console.log('search', this.search);
        this.dispatchEvent(new CustomEvent('search-changed', {
            detail: this.search,
            bubbles: true,
            composed: true,
        }));
    }

    override updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('visible')) {
            if (!this.visible) {
                this._selectedIndex = 0;
            }
        }

        if (changedProperties.has('data') && this.breadcrumbs.length === 0 && this.data[0]) {
            this.breadcrumbs = [this.data[0].id];
        }

        console.log('search', this.search);
    }

    override connectedCallback() {
        super.connectedCallback();

        hotkeys(this.hotkeys, (keyboardEvent, hotkeysEvent) => {
            keyboardEvent.preventDefault();
            this._toggle();
        });

        hotkeys(this.closeShortyHotkey, (keyboardEvent, hotkeysEvent) => {
            keyboardEvent.preventDefault();
            this.visible = false;
        });

        hotkeys(this.navigationUpHotkey, (keyboardEvent, hotkeysEvent) => {
            keyboardEvent.preventDefault();

            if (this._selectedIndex > 0) {
                this._selectedIndex--;
            } else {
                this._selectedIndex = this.data.length - 1;
            }
        });

        hotkeys(this.navigationDownHotkey, (keyboardEvent, hotkeysEvent) => {
            keyboardEvent.preventDefault();

            if (this._selectedIndex < this.data.length - 1) {
                this._selectedIndex++;
            } else {
                this._selectedIndex = 0;
            }
        });

        hotkeys(this.navigationBackHotkey, (keyboardEvent, hotkeysEvent) => {
            if (this.search) return;

            const parent = this._parentStack.pop();
            if (parent) {
                this.data = parent;
                this.breadcrumbs = this.breadcrumbs.slice(0, -1);
                this._selectedIndex = 0;
            }
        });

        hotkeys(this.handleActionHotkey, (keyboardEvent, hotkeysEvent) => {
            keyboardEvent.preventDefault();
            const selectedAction = this.data[this._selectedIndex];

            if (selectedAction?.children?.length) {
                this._parentStack.push(this.data);  // save current level
                this.breadcrumbs = [...this.breadcrumbs, selectedAction.id];
                this.data = selectedAction.children;
                this._selectedIndex = 0;
            } else {
                if (selectedAction?.handler) {
                    selectedAction.handler();
                }
            }
        });
    }

    override render() {
        return html`
            <div class="shorty">
                <shorty-header
                        placeholder=${this.placeholder}
                        .breadcrumbs=${this.breadcrumbs}
                        @search-changed=${this._handleInputSearch}
                ></shorty-header>
                <shorty-content .data=${this.data} .selectedIndex=${this._selectedIndex}></shorty-content>
                <shorty-footer></shorty-footer>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hey-shorty': HeyShorty;
    }
}