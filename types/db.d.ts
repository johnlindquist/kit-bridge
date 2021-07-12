import { Choice, Script } from "./type.js";
import { Low } from "lowdb";
export declare let db: (key: any, defaults?: any, fromCache?: boolean) => Promise<any>;
export declare let getScriptsDb: (fromCache?: boolean) => Promise<{
    scripts: Script[];
}>;
export declare let getPrefs: () => Promise<any>;
export declare let getScriptFromString: (script: string) => Promise<Script>;
export declare let getScripts: (fromCache?: boolean) => Promise<Script[]>;
export interface ScriptValue {
    (pluck: keyof Script, fromCache?: boolean): () => Promise<Choice<string>[]>;
}
export declare let scriptValue: ScriptValue;
declare type AppDb = {
    needsRestart: boolean;
    version: string;
};
export declare let getAppDb: () => Promise<Low<any> & AppDb>;
declare type ShortcutsDb = {
    shortcuts: {
        [key: string]: string;
    };
};
export declare let getShortcutsDb: () => Promise<Low<any> & ShortcutsDb>;
declare type PrefsDb = {
    showJoin: boolean;
};
export declare let getPrefsDb: () => Promise<Low<any> & PrefsDb>;
declare type PromptDb = {
    screens: {
        [key: string]: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
};
export declare let getPromptDb: () => Promise<Low<any> & PromptDb>;
export {};
