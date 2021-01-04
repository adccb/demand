import { $CONFIG_FILE } from './reapers/onInit.js'

const {
  default: { npm: rawNpm, custom: rawCustom, git: rawGit, python: rawPython },
} = await import($CONFIG_FILE)

const normalize = ([keypress, value]) => ({ keypress, ...value })

let index = 0
const attachSource = (source, collection) =>
  Object.entries(collection).reduce(
    (hash, [k, v]) => ({
      ...hash,
      [k]: { ...v, source, idx: index++ },
    }),
    {},
  )

export const custom = attachSource('custom', rawCustom)
export const npm = attachSource('npm', rawNpm)
export const git = attachSource('git', rawGit)
export const python = attachSource('python', rawPython)

export const maxIndex = index - 1
export default [
  ...Object.entries(custom),
  ...Object.entries(npm),
  ...Object.entries(git),
  ...Object.entries(python),
].map(normalize)
