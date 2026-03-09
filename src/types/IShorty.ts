import {ISection} from "./ISection";

export interface IShorty {
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