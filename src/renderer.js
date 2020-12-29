import items from './handlers/index.js'

const prefixes = {
  npm: '📦',
  custom: '🔧',
}

const renderOption = ({ keypress, title, idx, source }, activeIndex) => {
  const str = `[${keypress}] → ${title}`
  return `${prefixes[source] || '🤷‍♀️'} ${
    idx === activeIndex ? str.selected : str
  }`
}

const render = ({ index }) => {
  const option = items.find(({ idx }) => idx === index)
  const displayOptions = `${items
    .map(item => renderOption(item, index))
    .join('\n')}`

  console.clear()
  console.log(
    `[${String(index).yellow}] choose your fighter`,
    `w/s to move, enter to select`.grey,
  )
  if (displayOptions.length) console.log(displayOptions)
  process.stdout.write(`\nwill run: ${option.cmd.blue} `)
}

export default render
