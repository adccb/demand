import { homedir } from 'os'
import { promises } from 'fs'

const { mkdir, writeFile } = promises
const $HOME = homedir()
const $CONFIG_DIR = `${$HOME}/.config/demand/`
export const $CONFIG_FILE = `${$CONFIG_DIR}/items.js`

const defaultConfig = `module.exports = {
  custom: {},
  git: {
    g: { title: 'status', cmd: 'git status' },
    d: { title: 'diff', cmd: 'git diff' },
    D: { title: 'diff-cached', cmd: 'git diff --cached' },
  },
  npm: {},
  python: {},
}`

export const onInit = async () => {
  await mkdir($CONFIG_DIR, { recursive: true })
  await writeFile($CONFIG_FILE, defaultConfig)

  process.exit()
}
