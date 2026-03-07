import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

interface ISection {
    name: string;
    priority: number;
}

interface IShorty {
    id: string;
    name: string;
    icon?: string;
    handler?: Function;
    hotkeys?: string[];
    parent?: string;
    keywords?: string;
    children?: IShorty[];
    section?: ISection;
}

@customElement('shorty-key') export class ShortyKey extends LitElement {
    static override styles = css`
        .shorty-key {
            padding: 2px 4px;
    
            background: var(--shorty-key-background-color);
            color: var(--shorty-key-text-color);
    
            border-radius: var(--shorty-key-border-radius);
            font-size: var(--shorty-key-font-size);
            text-align: center;
            
            font-weight: lighter;
        }
    `

    @property()
    hotkey: string = '';

    override render() {

        return html`
            <div class="shorty-key">${this.hotkey}</div>
        `;
    }
}

@customElement('shorty-header')
export class ShortyHeader extends LitElement {
    @property()
    breadcrumbs: string[] = ['Home', 'Library', 'Data', 'Reports'];

    static override styles = css`
        .shorty-header {
            display: flex;
            flex-direction: column;
            row-gap: 1.25em;
            
            padding: 1.25em;
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
                    <input type="text" id="search-input" placeholder="Search..."></input>
                </div>
            </div>
        `;
    }
}

@customElement('shorty-footer')
export class ShortyFooter extends LitElement {
    static override styles = css`
        .shorty-footer {
            display: flex;
            flex-direction: row;
            gap: 1em;
            background: var(--shorty-footer-background);
            height: 25px;
            margin-top: auto;
            padding: 0.5em 1em
        }

        .shorty-footer svg {
            width: 1em;
            height: 1em;
            padding: 0.06em 0.25em;
            fill: var(--shorty-secondary-text-color);
            background-color: var(--shorty-secondary-background-color);
            border-radius: var(--shorty-key-border-radius);
            font-size: var(--shorty-key-font-size);
        }

        .shorty-footer .help {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 0.25em;
            text-align: center;
            font-size: 0.75em;
            color: var(--shorty-secondary-text-color);
        }
    `

    override render() {
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

@customElement('shorty-body')
export class ShortyBody extends LitElement {
    @property()
    shorties: IShorty[] = [
        {
            id: '1',
            name: 'Shorty 1',
            icon: 'icon-1',
            hotkeys: ['CTRL', '+', 'P'],
            keywords: 'shorty, 1',
            section: {
                name: 'Section 1',
                priority: 1
            }
        },
        {
            id: '2',
            name: 'Shorty 2',
            icon: 'icon-2',
            keywords: 'shorty, 2',
            section: {
                name: 'Section 2',
                priority: 2
            }
        },
    ]

    static override styles = css`
        .shorty-body {
            display: flex;
            flex-direction: column;
            padding: 0.5em 0;

            height: var(--shorty-actions-height);
            
            border-top: 1px solid rgb(239, 241, 244);
            border-bottom: 1px solid rgb(239, 241, 244);
        }
        
        .shorty-action {
            display: flex;
            flex-direction: row;
            align-items: center;
            
            padding: 0.75em 1em;
        }
        
        .shorty-icon {
            width: 12px;
            height: 12px;
            background-color: var(--shorty-secondary-background-color);
            border-radius: 50%;
            margin-right: 1em;
        }
        
        .shorty-name {
            flex-grow: 1;
            color: var(--shorty-text-color);
        }
        
        .shorty-hotkeys {
            display: flex;
            flex-direction: row;
            gap: 0.2em;
        }
    `

    override render() {
        return html`
            <div class="shorty-body">
                ${this.shorties.map(shorty => html`
                    <div class="shorty-action">
                        <div class="shorty-icon"></div>
                        <p class="shorty-name">
                            ${shorty.name}
                        </p>
                        <div class="shorty-hotkeys">
                            ${shorty.hotkeys && shorty.hotkeys.length > 0 ? html`
                                ${shorty.hotkeys.map(hotkey => html`
                                    <shorty-key hotkey="${hotkey}"></shorty-key>
                                `)}
                            `: ''}
                        </div>
                    </div>
                `)}
            </div>
        `;
    }
}

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
            --shorty-key-font-size: 0.75em;
            
            --shorty-accent-color: rgb(110, 94, 210);
            --shorty-secondary-background-color: rgb(239, 241, 244);
            --shorty-secondary-text-color: rgb(107, 111, 118);

            --shorty-selected-background: rgb(248, 249, 251);

            --shorty-content-background: #fff;
            --shorty-content-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
            --shorty-content-border-radius: 0.5em;

            --shorty-actions-height: 300px;
            --shorty-group-text-color: rgb(144, 149, 157);

            --shorty-footer-background: rgba(242, 242, 242, 0.4);

            --shorty-placeholder-color: #8e8e8e;

            --shorty-z-index: 99999;
        }
        
        #content {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            top: var(--shorty-top);
            
            display: flex;
            flex-direction: column;
            
            min-height: 400px;
            max-width: var(--shorty-width);
            min-width: 600px; //TODO: remove this
            background-color: var(--shorty-content-background);
            
            box-shadow: var(--shorty-content-shadow);
            border-radius: var(--shorty-content-border-radius);
            
            z-index: var(--shorty-z-index);
        }
    `

    override render() {
        return html`
            <div id="content">
                <shorty-header></shorty-header>
                <shorty-body></shorty-body>
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