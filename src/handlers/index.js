import rawNpm from './npm.js'
import rawCustom from './custom.js'

const normalize = ([keypress, value]) => ({ keypress, ...value })

let index = 0
export const custom = Object.entries(rawCustom).reduce(
  (hash, [k, v]) => ({
    ...hash,
    [k]: { ...v, source: 'custom', idx: index++ },
  }),
  {},
)

export const npm = Object.entries(rawNpm).reduce(
  (hash, [k, v]) => ({
    ...hash,
    [k]: { ...v, source: 'npm', idx: index++ },
  }),
  {},
)

export const maxIndex = index - 1
export default [...Object.entries(custom), ...Object.entries(npm)].map(
  normalize,
)
