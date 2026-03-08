import { LitElement } from 'lit';
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
    section?: ISection;
    children?: IShorty[];
}
export declare class ShortyKey extends LitElement {
    static styles: import("lit").CSSResult;
    hotkey: string;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class ShortyAction extends LitElement {
    static styles: import("lit").CSSResult;
    name: string;
    icon: string;
    hotkeys: string[];
    selected: boolean;
    hovered: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class ShortyHeader extends LitElement {
    breadcrumbs: string[];
    placeholder: string;
    search: string;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class ShortyFooter extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class ShortyBody extends LitElement {
    static styles: import("lit").CSSResult;
    data: IShorty[];
    selectedIndex: number;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class HeyShorty extends LitElement {
    static styles: import("lit").CSSResult;
    data: Array<IShorty>;
    breadcrumbs: Array<string>;
    search: string;
    placeholder: string;
    hotkeys: string;
    navigationUpHotkey: string;
    navigationDownHotkey: string;
    closeShortyHotkey: string;
    navigationBackHotkey: string;
    handleActionHotkey: string;
    visible: boolean;
    toggle(): void;
    private _selectedIndex;
    private _parentStack;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'hey-shorty': HeyShorty;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map