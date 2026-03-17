import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import hotkeys from 'hotkeys-js';
import '@material/mwc-icon';
import { IShorty } from './types/IShorty';
import './components/shorty-header';
import './components/shorty-content';
import './components/shorty-footer';
import Fuse from 'fuse.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ShortyHeader } from './components/shorty-header';

@customElement('hey-shorty')
export class HeyShorty extends LitElement {
  static override styles = css`
    :host {
      --shorty-width: 640px;
      --shorty-text-color: rgb(60, 65, 73);
      --shorty-font-size: 16px;
      --shorty-font-family: system-ui, sans-serif;
      --shorty-top: 20%;

      --shorty-key-border-radius: 0.25em;
      --shorty-key-background-color: color-mix(in srgb, var(--shorty-primary-color) 90%, black 10%);
      --shorty-border: 1px solid rgb(239, 241, 244);

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

    .shorty-underlay {
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
  `;

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

  @property({ type: Array })
  data = [] as Array<IShorty>;

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

  @property()
  goToFirstResultHotkey = 'ctrl+up,cmd+up';

  @property()
  goToLastResultHotkey = 'ctrl+down,cmd+down';

  @property({ type: Number })
  maxSearchResults = 99;

  @property({ type: Boolean })
  highlightMatches = true;

  @property({ type: Array })
  private _breadcrumbs: Array<string> = [];

  @state()
  private _visible = false;

  @state()
  private _selectedIndex = 0;

  @state()
  private _search = '';

  @state()
  private _searchResults: IShorty[] = [];

  @state()
  private _activeData: IShorty[] = [];

  private _parentStack: Array<typeof this.data> = [];

  private _currentLevelData: IShorty[] = [];

  private _currentAction: IShorty | undefined;

  private _fuse: Fuse<IShorty> | undefined;

  private _shortyHeader = createRef<ShortyHeader>();

  private _toggle() {
    this._visible = !this._visible;
  }

  private _handleInputSearch(event: CustomEvent<{ search: string }>) {
    this._search = event.detail.search;
    this.dispatchEvent(
      new CustomEvent('search-changed', {
        detail: this._search,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleClickedOutside(event: MouseEvent) {
    if ((event.target as HTMLElement)?.classList.contains('shorty-underlay')) {
      this._visible = false;
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

  private _resetAfterAction() {
    this._search = '';
    this._shortyHeader.value?.focusSearch();
    this._selectedIndex = 0;
    this._searchResults = [];
  }

  private _handleAction() {
    this._reanimateContent();

    const selectedAction = this._activeData[this._selectedIndex];

    if (selectedAction.handler) {
      selectedAction.handler();
      this._visible = false;
      this._resetState();
      return;
    }

    if (selectedAction?.children?.length) {
      this._parentStack.push(this._currentLevelData); // save current level
      this._breadcrumbs = [...this._breadcrumbs, selectedAction.id];
      this._currentLevelData = selectedAction.children;
      this._activeData = selectedAction.children;
    }

    this._resetAfterAction();
  }

  private _handleSelectedIndexChanged(event: CustomEvent<{ index: number }>) {
    this._selectedIndex = event.detail.index;
  }

  private _resetState() {
    this._search = '';
    this._selectedIndex = 0;
    this._searchResults = [];
    this._parentStack = [];
    this._breadcrumbs = [this.data[0].id];
    this._currentLevelData = this.data;
  }

  override willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('data')) {
      if (this._breadcrumbs.length === 0 && this.data[0]) {
        this._breadcrumbs = [this.data[0].id];
        this._currentAction = this.data[0];
      }

      // Initialize current level data
      this._currentLevelData = this.data;

      const flattenData = this._flattenData();

      const fuseOptions = {
        keys: ['name'],
        shouldSort: true,
        includeMatches: true,
        includeScore: true,
      };

      this._fuse = new Fuse(flattenData, fuseOptions);

      flattenData.forEach(action => {
        const actionHotkeys = (action.hotkeys || []).join('+');

        hotkeys(actionHotkeys, (keyboardEvent, hotkeysEvent) => {
          keyboardEvent.preventDefault();
          if (action.handler) action.handler();
        });
      });
    }

    // RACE CONDITION:
    // Search FIRST - before determining active data
    if (changedProperties.has('_search') || changedProperties.has('data')) {
      if (this._search && this._fuse) {
        // global search if at top level else search current level
        if (this._breadcrumbs.length === 1) {
          this._fuse.setCollection(this._flattenData());
        } else {
          this._fuse.setCollection(this._currentLevelData);
        }

        const result = this._fuse.search(this._search);

        const highlightedMatches = result.map(res => {
          const item = res.item;
          const matches = res.matches || [];
          const nameMatch = matches.find(m => m.key === 'name');

          if (nameMatch && nameMatch.indices) {
            let highlightedName = '';
            let lastIndex = 0;

            const sortedIndices = [...nameMatch.indices].sort((a, b) => a[0] - b[0]);

            for (const [start, end] of sortedIndices) {
              highlightedName += item.name.slice(lastIndex, start);
              highlightedName += `<span class="action-highlight action-name">${item.name.slice(start, end + 1)}</span>`;
              lastIndex = end + 1;
            }

            highlightedName += item.name.slice(lastIndex);

            return {
              ...item,
              name: highlightedName,
            };
          }

          return item;
        });

        this._searchResults = this.highlightMatches
          ? highlightedMatches
          : result.map(res => res.item);
      } else {
        this._searchResults = [];
        this._activeData = this._currentLevelData;
      }

      this._selectedIndex = 0;
    }

    // THEN determine active data based on updated search results
    if (changedProperties.has('data') || changedProperties.has('_searchResults')) {
      if (this._search && this._searchResults.length > 0) {
        this._activeData = this._searchResults;
      } else if (this._search && this._searchResults.length <= 0) {
        this._activeData = [];
      } else if (this._parentStack.length === 0) {
        this._activeData = this.data;
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
      this._visible = false;
      this._resetState();
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
        this._currentLevelData = parent;
        this._activeData = parent;
        this._breadcrumbs = this._breadcrumbs.slice(0, -1);
      }
    });

    hotkeys(this.handleActionHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      this._handleAction();
    });

    hotkeys(this.goToFirstResultHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      this._selectedIndex = 0;
    });

    hotkeys(this.goToLastResultHotkey, (keyboardEvent, hotkeysEvent) => {
      keyboardEvent.preventDefault();
      this._selectedIndex = this._activeData.length - 1;
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
    hotkeys.unbind(this.goToFirstResultHotkey);
    hotkeys.unbind(this.goToLastResultHotkey);

    this._flattenData().forEach(action => {
      const actionHotkeys = (action.hotkeys || []).join('+');
      hotkeys.unbind(actionHotkeys);
    });
  }

  override render() {
    return this._visible
      ? html`
          <div
            class="shorty-underlay ${this._visible ? 'shorty-visible' : ''}"
            @click=${this._handleClickedOutside}
          >
            <div class="shorty">
              <shorty-header
                ${ref(this._shortyHeader)}
                .breadcrumbs=${this._breadcrumbs}
                .search=${this._search}
                placeholder=${this.placeholder}
                @search=${this._handleInputSearch}
              ></shorty-header>
              <shorty-content
                .data=${this._activeData.slice(0, this.maxSearchResults)}
                .selectedIndex=${this._selectedIndex}
                @action=${this._handleAction}
                @selected-index-changed=${this._handleSelectedIndexChanged}
              ></shorty-content>
              <shorty-footer .action=${this._currentAction}></shorty-footer>
            </div>
          </div>
        `
      : undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hey-shorty': HeyShorty;
  }
}
