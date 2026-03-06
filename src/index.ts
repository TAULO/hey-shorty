import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

interface ISection {
    name: string;
    priority: number;
}

interface IShorty {
    id: string;
    name: string;
    handler?: Function;
    icon?: string;
    parent?: string;
    keywords?: string;
    children?: IShorty[];
    section?: ISection;
}

@customElement('shorty-body')
export class ShortyBody extends LitElement {
    static override styles = css`
        div {
            background-color: red;
        }
    `

    override render() {
        return html`
            <div>
<!--                Body-->
            </div>
        `;
    }
}

@customElement('hey-shorty')
export class HeyShorty extends LitElement {
    static override styles = css`
        #content {
            position: fixed;
            left: 50%;
            transform: translateX(-50%);
            top: 25%;
            width: 50%;
            
            min-height: 400px;
            max-width: 640px;
            
            box-shadow: rgb(0 0 0 / 50%) 0px 16px 70px;
            
            border-radius: 0.5em;
        }
    `

    override render() {
        return html`
            <div id="content">
                <shorty-body></shorty-body>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hey-shorty': HeyShorty;
    }
}