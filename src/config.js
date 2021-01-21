import { $CONFIG_FILE } from './reapers/onInit.js'

const getConfig = async () => {
  const {
    default: { npm: rawNpm, custom: rawCustom, git: rawGit, python: rawPython },
  } = await import($CONFIG_FILE)

  return { rawNpm, rawCustom, rawGit, rawPython }
}

const normalize = ([keypress, value]) => ({ keypress, ...value })

export default async () => {
  let index = 0
  const attachSource = (source, collection) =>
    Object.entries(collection).reduce(
      (hash, [k, v]) => ({
        ...hash,
        [k]: { ...v, source, idx: index++ },
      }),
      {},
    )

  const { rawNpm, rawCustom, rawGit, rawPython } = await getConfig()

  const custom = attachSource('custom', rawCustom)
  const npm = attachSource('npm', rawNpm)
  const git = attachSource('git', rawGit)
  const python = attachSource('python', rawPython)

  return {
    items: [
      ...Object.entries(custom),
      ...Object.entries(npm),
      ...Object.entries(git),
      ...Object.entries(python),
    ].map(normalize),
    custom,
    npm,
    git,
    python,
    maxIndex: index - 1,
  }
}
