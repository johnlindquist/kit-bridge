export declare enum Mode {
    GENERATE = "GENERATE",
    FILTER = "FILTER",
    MANUAL = "MANUAL",
    HOTKEY = "HOTKEY"
}
export declare enum Channel {
    CHOICE_FOCUSED = "CHOICE_FOCUSED",
    CLEAR_CACHE = "CLEAR_CACHE",
    CONSOLE_LOG = "CONSOLE_LOG",
    CONSOLE_WARN = "CONSOLE_WARN",
    CONTENT_HEIGHT_UPDATED = "CONTENT_HEIGHT_UPDATED",
    CONTENT_SIZE_UPDATED = "CONTENT_SIZE_UPDATED",
    COPY_PATH_AS_PICTURE = "COPY_PATH_AS_PICTURE",
    CREATE_KENV = "CREATE_KENV",
    ESCAPE_PRESSED = "ESCAPE_PRESSED",
    EXIT = "EXIT",
    GENERATE_CHOICES = "GENERATE_CHOICES",
    GET_BACKGROUND = "GET_BACKGROUND",
    GET_MOUSE = "GET_MOUSE",
    GET_SCHEDULE = "GET_SCHEDULE",
    GET_SCREEN_INFO = "GET_SCREEN_INFO",
    GET_SCRIPTS_STATE = "GET_SCRIPTS_STATE",
    GET_SERVER_STATE = "GET_SERVER_STATE",
    GROW_PROMPT = "GROW_PROMPT",
    HIDE_APP = "HIDE_APP",
    NEEDS_RESTART = "NEEDS_RESTART",
    PROMPT_BOUNDS_UPDATED = "PROMPT_BOUNDS_UPDATED",
    PROMPT_ERROR = "PROMPT_ERROR",
    QUIT_APP = "QUIT_APP",
    RESET_PROMPT = "RESET_PROMPT",
    SET_SCRIPT = "SET_SCRIPT",
    SET_PROMPT_PROP = "SET_PROMPT_PROPS",
    SET_PROMPT_BOUNDS = "SET_PROMPT_BOUNDS",
    SEND_RESPONSE = "SEND_RESPONSE",
    SET_EDITOR_CONFIG = "SET_EDITOR_CONFIG",
    SET_FORM_HTML = "SET_FORM_HTML",
    SET_MAX_HEIGHT = "SET_MAX_HEIGHT",
    SET_TEXTAREA_CONFIG = "SET_TEXTAREA_CONFIG",
    SET_CHOICES = "SET_CHOICES",
    SET_HINT = "SET_HINT",
    SET_IGNORE_BLUR = "SET_IGNORE_BLUR",
    SET_INPUT = "SET_INPUT",
    SET_LOGIN = "SET_LOGIN",
    SET_MODE = "SET_MODE",
    SET_PANEL = "SET_PANEL",
    SET_PLACEHOLDER = "SET_PLACEHOLDER",
    SET_TAB_INDEX = "SET_TAB_INDEX",
    SHOW = "SHOW",
    SHOW_IMAGE = "SHOW_IMAGE",
    SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
    SET_PROMPT_DATA = "SET_PROMPT_DATA",
    SHOW_TEXT = "SHOW_TEXT",
    SHRINK_PROMPT = "SHRINK_PROMPT",
    SWITCH_KENV = "SWITCH_KENV",
    TAB_CHANGED = "TAB_CHANGED",
    TOGGLE_BACKGROUND = "TOGGLE_BACKGROUND",
    UPDATE_APP = "UPDATE_APP",
    UPDATE_PROMPT_WARN = "UPDATE_PROMPT_WARN",
    USER_RESIZED = "USER_RESIZED",
    VALUE_SUBMITTED = "VALUE_SUBMITTED",
    SET_PREVIEW = "SET_PREVIEW",
    CLEAR_PROMPT_CACHE = "CLEAR_PROMPT_CACHE",
    PROMPT_BLURRED = "PROMPT_BLURRED",
    SET_PID = "SET_PID"
}
export declare enum ProcessType {
    Schedule = "Schedule",
    App = "App",
    Background = "Background",
    Prompt = "Prompt",
    Watch = "Watch",
    System = "System",
    KIT_PROCESS = "KIT_PROCESS"
}
export declare enum ErrorAction {
    Open = "Open",
    Log = "Log",
    KitLog = "KitLog",
    Ask = "Ask"
}
export declare enum ProcessState {
    Idle = "Idle",
    Active = "Active"
}
export declare enum UI {
    arg = "arg",
    textarea = "textarea",
    hotkey = "hotkey",
    drop = "drop",
    editor = "editor",
    form = "form",
    none = "none"
}
export declare enum Bin {
    scripts = "scripts",
    cli = "cli"
}