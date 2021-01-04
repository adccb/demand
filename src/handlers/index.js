import rawNpm from './npm.js'
import rawCustom from './custom.js'
import rawGit from './git.js'

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

export const maxIndex = index - 1
export default [
  ...Object.entries(custom),
  ...Object.entries(npm),
  ...Object.entries(git),
].map(normalize)
