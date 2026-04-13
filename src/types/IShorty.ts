import { TemplateResult } from 'lit';

export interface IShorty {
  id: string;
  name: string;
  icon?: string;
  handler?: Function;
  hotkeys?: string[];
  children?: IShorty[];
  preview?: string;
}
