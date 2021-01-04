import items from './config.js'
import { log, logN, write } from './components/buffer.js'

// this modifies String.prototype
// because i'm an absolute fool
import colors from 'colors'

colors.setTheme({
  selected: ['green', 'bold'],
})

const prefixes = {
  npm: '📦',
  custom: '🔧',
  git: '🎛️ ',
  python: '🐍',
  unknown: '🤷‍♀️',
}

const renderOption = activeIndex => ({ keypress, title, idx, source }) => {
  const str = `[${keypress}] → ${title}`
  return `${prefixes[source] || '🤷‍♀️'} ${
    idx === activeIndex ? str.selected : str
  }`
}

const render = ({ index }) => {
  write()
  const displayOptions = items.map(renderOption(index)).join('\n')
  const { cmd } = items.find(({ idx }) => idx === index)

  log(
    `[${index}]`.grey,
    'choose your fighter'.bold,
    '(',
    'q/Esc'.blue,
    'to quit'.grey,
    ';;'.grey,
    'w/s'.blue,
    'to move'.grey,
    ';;'.grey,
    'enter'.blue,
    'to select'.grey,
    ';;'.grey,
    'key commands in'.grey,
    '[brackets]'.blue,
    'can be used any time'.grey,
    ')',
    '\n',
  )

  if (displayOptions.length) log(displayOptions, '\n')

  logN(`$ ${cmd}`.grey)
  write()
}

export default render
