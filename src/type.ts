import { ProcessType } from "./enum.js"

export interface Choice<Value = any> {
  name: string
  value?: Value
  description?: string
  focused?: string
  img?: string
  html?: string
  preview?: string
  id?: string
}

export interface Script extends Choice {
  filePath: string
  command: string
  menu?: string
  shortcut?: string
  description?: string
  shortcode?: string
  alias?: string
  author?: string
  twitter?: string
  exclude?: string
  schedule?: string
  system?: string
  watch?: string
  background?: string
  isRunning?: boolean
  type: ProcessType
  requiresPrompt: boolean
  timeout?: number
  tabs?: string[]
  kenv: string
  image?: string
  icon?: string
}
