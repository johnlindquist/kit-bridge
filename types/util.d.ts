import { Script } from "./type.js";
export declare let home: (...pathParts: string[]) => string;
export declare let wait: (time: number) => Promise<void>;
export declare let checkProcess: (pid: string | number) => string;
export declare let isFile: (file: string) => Promise<boolean>;
export declare let isDir: (dir: string) => Promise<boolean>;
export declare let isBin: (bin: string) => Promise<boolean>;
export declare let kitPath: (...parts: string[]) => string;
declare global {
    namespace NodeJS {
        interface Global {
            kitScript: string;
        }
    }
}
export declare let kenvPath: (...parts: string[]) => string;
export declare let kitDotEnv: () => string;
export declare const prefsPath: string;
export declare const shortcutsPath: string;
export declare const promptDbPath: string;
export declare const appDbPath: string;
export declare const tmpClipboardDir: string;
export declare const mainScriptPath: string;
export declare const execPath: string;
export declare const KENV_SCRIPTS: string;
export declare const KENV_APP: string;
export declare const KENV_BIN: string;
export declare const KIT_MAC_APP: string;
export declare const KIT_MAC_APP_PROMPT: string;
export declare const PATH: string;
export declare let assignPropsTo: (source: {
    [s: string]: unknown;
} | ArrayLike<unknown>, target: {
    [x: string]: unknown;
}) => void;
export declare let resolveToScriptPath: (file: string, cwd?: string) => string;
export declare let resolveScriptToCommand: (script: string) => string;
export declare const shortcutNormalizer: (shortcut: string) => string;
export declare const friendlyShortcut: (shortcut: string) => string;
export declare let info: (filePath: string) => Promise<Script>;
export declare let getLastSlashSeparated: (string: string, count: number) => string;
export declare let getScriptFiles: (kenv?: string) => Promise<string[]>;
export declare let getKenvs: () => Promise<string[]>;
export declare let writeScriptsDb: () => Promise<Script[]>;
export declare let stripMetadata: (fileContents: string) => string;
export declare const getLogFromScriptPath: (filePath: string) => string;
