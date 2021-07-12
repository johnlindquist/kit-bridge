import { editor } from "../api/editor.api";
import { ChangeEvent, KeyboardEvent } from "react";
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
    secret?: "password" | "text";
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
export interface ChoiceButtonData {
    choices: Choice[];
    currentIndex: number;
    inputValue: string;
    mouseEnabled: boolean;
    onIndexChange: (index: number) => void;
    onIndexSubmit: (index: number) => void;
}
export interface ChoiceButtonProps {
    data: ChoiceButtonData;
    index: number;
    style: any;
}
export declare enum Secret {
    password = "password",
    text = "text"
}
export interface InputProps {
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    secret: Secret;
    value: any;
}
export interface HotkeyProps {
    submit(data: any): void;
    onEscape(): void;
}
export interface DropProps {
    placeholder: string;
    submit(data: any): void;
    onEscape(): void;
}
export interface ListProps {
    height: number;
    width: number;
    onListChoicesChanged: (listHeight: number) => void;
    index: number;
    choices: ChoiceButtonData["choices"];
    onIndexChange: ChoiceButtonData["onIndexChange"];
    onIndexSubmit: ChoiceButtonData["onIndexSubmit"];
    inputValue: string;
}
export interface EditorProps {
    options: EditorConfig;
    height: number;
    width: number;
}
export declare type EditorConfig = editor.IStandaloneEditorConstructionOptions & {
    language?: string;
    value?: string;
};
export declare type TextareaConfig = {
    placeholder?: string;
    value?: string;
};
export declare type EditorRef = editor.IStandaloneCodeEditor;
