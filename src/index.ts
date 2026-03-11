import {css, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import hotkeys from 'hotkeys-js';
import '@material/mwc-icon';
import {IShorty} from "./types/IShorty";
import './components/shorty-header';
import './components/shorty-content';
import './components/shorty-footer';
import Fuse from "fuse.js";
import {createRef, ref} from "lit/directives/ref.js";
import {ShortyHeader} from "./components/shorty-header";

@customElement('hey-shorty')
export class HeyShorty extends LitElement {
    static override styles = css`
        /* noinspection CssUnresolvedCustomProperty */

        :host {
            --shorty-width: 640px;
            --shorty-text-color: rgb(60, 65, 73);
            --shorty-font-size: 16px;
            --shorty-font-family: system-ui, sans-serif;
            --shorty-top: 20%;

            --shorty-key-border-radius: 0.25em;
            --shorty-key-background-color: color-mix(in srgb, var(--shorty-primary-color) 90%, black 10%);

            --shorty-key-font-size: 0.85em;

            --shorty-secondary-background-color: rgb(239, 241, 244);
            --shorty-secondary-text-color: rgb(107, 111, 118);

            --shorty-selected-background: rgb(248, 249, 251);

            --shorty-primary-color: #fff;
            --shorty-secondary-color: #ff6b00;

            --shorty-content-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
            --shorty-content-border-radius: 0.5em;

            --shorty-actions-height: 300px;
            --shorty-placeholder-color: #8e8e8e;

            --shorty-action-icon-size: 1.2em;
        }

        .underlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
        }

        .shorty-visible {
            background-color: rgba(0, 0, 0, 0.1);
        }

        /* noinspection CssUnresolvedCustomProperty */

        .shorty {
            animation: pop-in 0.2s ease;
            will-change: transform;

            position: relative;
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

            font-family: var(--shorty-font-family), sans-serif;
            font-size: var(--shorty-font-size);
        }

        @keyframes pop-in {
            0% {
                transform: translateX(-50%) scale(0.99);
            }
            50% {
                transform: translateX(-50%) scale(1.01);
            }
            100% {
                transform: translateX(-50%) scale(1);
            }
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

    @property({type: Number})
    maxSearchResults = 99;

    @state()
    private _selectedIndex = 0;

    @state()
    private _search = '';

    @state()
    private _searchResults: IShorty[] = [];

    @state()
    private _currentAction: IShorty | undefined;

    @state()
    private _activeData: IShorty[] = [];

    private _parentStack: Array<typeof this.data> = [];

    private _fuse: Fuse<IShorty> | undefined;

    private _shortyHeader = createRef<ShortyHeader>();

    private _toggle() {
        this.visible = !this.visible;
    }

    private _handleInputSearch(event: CustomEvent<{ search: string }>) {
        this._search = event.detail.search;
        this.dispatchEvent(new CustomEvent('search-changed', {
            detail: this._search,
            bubbles: true,
            composed: true,
        }));
    }

    private _handleClickedOutside(event: MouseEvent) {
        if (this.visible && !this.contains(event.target as Node)) {
            this.visible = false;
        }
    }

    private _reanimateContent() {
        const shorty = this.shadowRoot?.querySelector('.shorty');
        if (!shorty) return;

        shorty.classList.remove('shorty');
        requestAnimationFrame(() => {
            shorty.classList.add('shorty');
        });
    }

    private _flattenData(): IShorty[] {
        const flatten = (items: IShorty[]): IShorty[] => {
            return items.reduce<IShorty[]>((acc, item) => {
                acc.push(item);
                if (item.children?.length) {
                    acc.push(...flatten(item.children));
                }
                return acc;
            }, []);
        };

        return flatten(this.data);
    }

    private _resetAfterNavigation() {
        this._search = '';
        this._selectedIndex = 0;
        this._shortyHeader.value?.focusSearch();
    }

    override updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('visible')) {
            if (!this.visible) {
                this._resetAfterNavigation();
            }
        }
    }

    override willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('_search') || changedProperties.has('data') || changedProperties.has('_searchResults')) {
            this._activeData = this._search && this._searchResults.length > 0
                ? this._searchResults
                : this.data;
        }

        if (changedProperties.has('data')) {
            if (this.breadcrumbs.length === 0 && this.data[0]) {
                this.breadcrumbs = [this.data[0].id];
                this._currentAction = this.data[0];
            }
            this._fuse = new Fuse(this._flattenData().slice(0, this.maxSearchResults), {
                keys: ['name'],
                shouldSort: true,
            });

            this._flattenData().forEach(action => {
                const actionHotkeys = (action.hotkeys || []).join('+');

                hotkeys(actionHotkeys, (keyboardEvent, hotkeysEvent) => {
                    keyboardEvent.preventDefault();
                    if (action.handler) action.handler();
                });
            })
        }

        if (changedProperties.has('_search') || changedProperties.has('data')) {
            if (this._search && this._fuse) {
                const result = this._fuse.search(this._search);
                this._searchResults = result.map(res => res.item);
            } else {
                this._searchResults = [];
            }
        }

        if (changedProperties.has('_selectedIndex') || changedProperties.has('data')) {
            this._currentAction = this._activeData[this._selectedIndex];
        }
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
                this._selectedIndex = this._activeData.length - 1;
            }
        });

        hotkeys(this.navigationDownHotkey, (keyboardEvent, hotkeysEvent) => {
            keyboardEvent.preventDefault();

            if (this._selectedIndex < this._activeData.length - 1) {
                this._selectedIndex++;
            } else {
                this._selectedIndex = 0;
            }
        });

        hotkeys(this.navigationBackHotkey, (keyboardEvent, hotkeysEvent) => {
            if (this._search) return;

            const parent = this._parentStack.pop();
            if (parent) {
                this.data = parent;
                this.breadcrumbs = this.breadcrumbs.slice(0, -1);
                this._selectedIndex = 0;
            }
        });

        hotkeys(this.handleActionHotkey, (keyboardEvent, hotkeysEvent) => {
            keyboardEvent.preventDefault();
            this._reanimateContent();

            const selectedAction = this._activeData[this._selectedIndex];

            if (selectedAction.handler) {
                selectedAction.handler();
            }

            if (selectedAction?.children?.length) {
                this._parentStack.push(this.data);  // save current level
                this.breadcrumbs = [...this.breadcrumbs, selectedAction.id];
                this.data = selectedAction.children;
            }

            this._resetAfterNavigation();
        });
    }

    override disconnectedCallback() {
        super.disconnectedCallback();

        hotkeys.unbind(this.hotkeys);
        hotkeys.unbind(this.handleActionHotkey);
        hotkeys.unbind(this.navigationBackHotkey);
        hotkeys.unbind(this.closeShortyHotkey);
        hotkeys.unbind(this.navigationUpHotkey);
        hotkeys.unbind(this.navigationDownHotkey);
    }

    override render() {
        return true || this.visible ? html`
            <div class="underlay ${
                    this.visible ? 'shorty-visible' : ''
            }"
            >
                <div class="shorty">
                    <shorty-header
                            ${ref(this._shortyHeader)}
                            placeholder=${this.placeholder}
                            .breadcrumbs=${this.breadcrumbs}
                            @search=${this._handleInputSearch}
                            .search=${this._search}
                    ></shorty-header>
                    <shorty-content .data=${this._activeData} .selectedIndex=${this._selectedIndex}></shorty-content>
                    <shorty-footer
                            .action=${this._currentAction}
                    ></shorty-footer>
                </div>
            </div>
        ` : undefined;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hey-shorty': HeyShorty;
    }
}