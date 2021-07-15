import { editor } from "../api/editor.api";
import { ProcessType, UI, Channel, Mode } from "./enum.js";
export interface Choice<Value = any> {
    name: string;
    value?: Value;
    description?: string;
    focused?: string;
    img?: string;
    icon?: string;
    html?: string;
    preview?: string;
    id?: string;
    shortcode?: string[];
}
export interface Script extends Choice {
    filePath: string;
    command: string;
    menu?: string;
    shortcut?: string;
    alias?: string;
    author?: string;
    twitter?: string;
    exclude?: string;
    schedule?: string;
    system?: string;
    watch?: string;
    background?: string;
    isRunning?: boolean;
    type: ProcessType;
    requiresPrompt: boolean;
    timeout?: number;
    tabs?: string[];
    kenv: string;
    tag?: string;
}
export interface PromptData {
    id: number;
    script: Script;
    ui: UI;
    placeholder: string;
    kitScript: string;
    choices: Choice[];
    tabs: string[];
    ignoreBlur: boolean;
    textarea?: boolean;
    secret?: Secret;
}
export interface MessageData extends PromptData {
    channel: Channel;
    pid: number;
    log?: string;
    warn?: string;
    path?: string;
    filePath?: string;
    name?: string;
    args?: string[];
    mode?: Mode;
    ignore?: boolean;
    text?: string;
    options?: any;
    image?: any;
    html?: string;
    info?: string;
    input?: string;
    scripts?: boolean;
    kenvPath?: string;
    hint?: string;
    tabIndex?: number;
}
export declare enum Secret {
    password = "password",
    text = "text"
}
export interface EditorProps {
    options: EditorConfig;
    height: number;
    width: number;
}
export declare type EditorOptions = editor.IStandaloneEditorConstructionOptions & {
    scrollTo: "top" | "center" | "bottom";
};
export declare type EditorConfig = string | EditorOptions;
export declare type TextareaConfig = {
    placeholder?: string;
    value?: string;
};
export declare type EditorRef = editor.IStandaloneCodeEditor;
export declare type PromptBounds = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type PromptDb = {
    screens: {
        [screenId: string]: {
            [scriptId: string]: PromptBounds;
        };
    };
};
