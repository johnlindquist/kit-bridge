import * as path from "path"
import * as os from "os"

import { ProcessType, UI } from "./enum.js"
import { Script } from "./type.js"
import { copyFileSync } from "fs"
import { readFile, readdir, lstat } from "fs/promises"
import { execSync } from "child_process"

export let home = (...pathParts: string[]) => {
  return path.resolve(os.homedir(), ...pathParts)
}

export let wait = async (time: number): Promise<void> =>
  new Promise(res => setTimeout(res, time))

export let checkProcess = (pid: string | number) => {
  return execSync(`kill -0 ` + pid).buffer.toString()
}

export let isFile = async (
  file: string
): Promise<boolean> => {
  try {
    let stats = await lstat(file)
    return stats.isFile()
  } catch {
    return false
  }
}

export let isDir = async (
  dir: string
): Promise<boolean> => {
  try {
    let stats = await lstat(dir)

    return stats.isDirectory()
  } catch {
    return false
  }
}

export let isBin = async (
  bin: string
): Promise<boolean> => {
  try {
    return Boolean(execSync(`command -v ${bin}`))
  } catch {
    return false
  }
}

export let kitPath = (...parts: string[]) =>
  path.join(
    process.env.KIT || home(".kit"),
    ...parts.filter(Boolean)
  )

export let kenvPath = (...parts: string[]) => {
  return path.join(
    process.env.KENV || home(".kenv"),
    ...parts.filter(Boolean)
  )
}

export let kitDotEnv = () => {
  return process.env.KIT_DOTENV || kenvPath(".env")
}

export const prefsPath = kitPath("db", "prefs.json")
export const shortcutsPath = kitPath("db", "shortcuts.json")
export const promptDbPath = kitPath("db", "prompt.json")
export const appDbPath = kitPath("db", "app.json")
export const tmpClipboardDir = kitPath("tmp", "clipboard")
export const mainScriptPath = kitPath("main", "index.js")
export const execPath = kitPath("node", "bin", "node")

export const KENV_SCRIPTS = kenvPath("scripts")
export const KENV_APP = kenvPath("app")
export const KENV_BIN = kenvPath("bin")

export const KIT_MAC_APP = kitPath("mac-app.js")
export const KIT_MAC_APP_PROMPT = kitPath(
  "mac-app-prompt.js"
)
export const PATH = `${kitPath("node", "bin")}:${
  process.env.PATH
}`

export let assignPropsTo = (
  source: { [s: string]: unknown } | ArrayLike<unknown>,
  target: { [x: string]: unknown }
) => {
  Object.entries(source).forEach(([key, value]) => {
    target[key] = value
  })
}

export let resolveToScriptPath = (
  script: string
): string => {
  if (!script.endsWith(".js")) script += ".js"

  if (script.startsWith(path.sep)) return script

  if (script.startsWith("."))
    script = path.resolve(process.cwd(), script)

  if (!script.includes(path.sep))
    return kenvPath("scripts", script)

  if (
    !script.includes(kenvPath()) &&
    !script.includes(kitPath())
  ) {
    copyFileSync(script, kitPath("tmp"))

    let tmpScript = kitPath(
      "tmp",
      script.replace(/.*\//gi, "")
    )
    return tmpScript
  }

  return script
}

export let resolveScriptToCommand = (script: string) => {
  return script.replace(/.*\//, "").replace(".js", "")
}

export const shortcutNormalizer = (shortcut: string) =>
  shortcut
    ? shortcut
        .replace(/(option|opt)/i, "Alt")
        .replace(/(command|cmd)/i, "CommandOrControl")
        .replace(/(ctl|cntrl|ctrl)/, "Control")
        .split(/\s/)
        .filter(Boolean)
        .map(part =>
          (part[0].toUpperCase() + part.slice(1)).trim()
        )
        .join("+")
    : ""

export const friendlyShortcut = (shortcut: string) =>
  shortcut
    .replace(`CommandOrControl`, `cmd`)
    .replace(`Alt`, `opt`)
    .replace(`Control`, `ctrl`)
    .replace(`Shift`, `shift`)

export let info = async (file: string): Promise<Script> => {
  let filePath = file.startsWith("/scripts")
    ? kenvPath(file)
    : file.startsWith(path.sep)
    ? file
    : kenvPath(!file.includes("/") ? "scripts" : "", file)

  let fileContents = await readFile(filePath, "utf8")

  let getByMarker = (marker: string) =>
    fileContents
      .match(
        new RegExp(`(?<=^//\\s*${marker}\\s*).*`, "gim")
      )?.[0]
      .trim() || ""

  let command =
    filePath.split(path.sep)?.pop()?.replace(".js", "") ||
    ""

  let shortcut = shortcutNormalizer(
    getByMarker("Shortcut:")
  )
  let menu = getByMarker("Menu:")
  let schedule = getByMarker("Schedule:")
  let watch = getByMarker("Watch:")
  let system = getByMarker("System:")
  let img = getByMarker("Image:")
  let background = getByMarker("Background:")
  let timeout = parseInt(getByMarker("Timeout:"), 10)

  let tabs =
    fileContents.match(
      new RegExp(`(?<=onTab[(]['"]).*(?=\s*['"])`, "gim")
    ) || []

  let ui = (getByMarker("UI:") ||
    fileContents
      .match(/(?<=await )arg|textarea|hotkey|drop/g)?.[0]
      .trim() ||
    UI.none) as UI

  let requiresPrompt = ui !== UI.none

  let type = schedule
    ? ProcessType.Schedule
    : watch
    ? ProcessType.Watch
    : system
    ? ProcessType.System
    : background
    ? ProcessType.Background
    : ProcessType.Prompt

  let kenv =
    filePath.match(
      new RegExp(`(?<=${kenvPath("kenvs")}\/)[^\/]+`)
    )?.[0] || ""

  let iconPath = kenv
    ? kenvPath("kenvs", kenv, "icon.png")
    : ""

  let icon =
    kenv && (await isFile(iconPath)) ? iconPath : ""

  return {
    command,
    type,
    shortcut,
    menu,
    name:
      (menu || command) +
      (shortcut ? `: ${friendlyShortcut(shortcut)}` : ``),

    description: getByMarker("Description:"),
    alias: getByMarker("Alias:"),
    author: getByMarker("Author:"),
    twitter: getByMarker("Twitter:"),
    shortcode: getByMarker("Shortcode:")
      ?.split(" ")
      .map(sc => sc.trim().toLowerCase()),
    exclude: getByMarker("Exclude:"),
    schedule,
    watch,
    system,
    background,
    id: filePath,
    filePath,
    requiresPrompt,
    timeout,
    tabs,
    kenv,
    img,
    icon,
  }
}

export let getLastSlashSeparated = (
  string: string,
  count: number
) => {
  return (
    string
      .replace(/\/$/, "")
      .split("/")
      .slice(-count)
      .join("/") || ""
  )
}

export let getScripts = async (kenv = kenvPath()) => {
  let scriptsPath = path.join(kenv, "scripts")
  if (!(await isDir(scriptsPath))) {
    console.warn(`${scriptsPath} isn't a valid kenv dir`)
    return []
  }

  let result = await readdir(scriptsPath, {
    withFileTypes: true,
  })

  return result
    .filter(file => file.isFile())
    .map(file => file.name)
    .filter(name => name.endsWith(".js"))
    .map(file => path.join(scriptsPath, file))
}

export let getKenvs = async (): Promise<string[]> => {
  let kenvs: string[] = []
  if (!(await isDir(kenvPath("kenvs")))) return kenvs

  let kenvsDir = (...parts: string[]) =>
    kenvPath("kenvs", ...parts)

  for await (let kenvDir of await readdir(kenvsDir())) {
    kenvs.push(kenvsDir(kenvDir))
  }

  return kenvs
}

export let writeScriptsDb = async () => {
  let scriptFiles = await getScripts()
  let kenvDirs = await getKenvs()
  for await (let kenvDir of kenvDirs) {
    let scripts = await getScripts(kenvDir)
    scriptFiles = [...scriptFiles, ...scripts]
  }

  let scriptInfo = await Promise.all(scriptFiles.map(info))
  return scriptInfo
    .filter(
      (script: Script) =>
        !(script?.exclude && script?.exclude === "true")
    )
    .sort((a: Script, b: Script) => {
      let aName = a.name.toLowerCase()
      let bName = b.name.toLowerCase()

      return aName > bName ? 1 : aName < bName ? -1 : 0
    })
}

export let stripMetadata = (fileContents: string) => {
  let markers = [
    "Menu",
    "Description",
    "Schedule",
    "Watch",
    "System",
    "Background",
    "Author",
    "Twitter",
    "Shortcode",
    "Exclude",
    "Alias",
  ]
  return fileContents.replace(
    new RegExp(`(^//\\s*(${markers.join("|")}):).*`, "gim"),
    "$1"
  )
}
