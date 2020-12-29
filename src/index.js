import { exec } from 'child_process'

import render from './renderer.js'
import handleInput from './inputs.js'
import items, { maxIndex } from './handlers/index.js'

// this modifies String.prototype
// because i'm an absolute fool
import colors from 'colors'

colors.setTheme({
  selected: ['green', 'bold'],
})

// prepare stdin
process.stdin.setRawMode(true)
process.stdin.setEncoding('utf8')

const getUserInput = () => {
  process.stdin.resume()
  return new Promise(res => {
    const cont = key => {
      if (['\u0003', 'q'].includes(key)) process.exit()
      else res(key)
      process.stdin.removeListener('data', cont)
    }

    process.stdin.on('data', cont)
  })
}

const context = {
  index: 0,
}

let input
const run = async () => {
  render(context)

  while ((input = await getUserInput())) {
    handleInput(input, {
      index: context.index,
      async onCommand(input, { byIndex = false } = {}) {
        const { cmd } = items.find(({ keypress, idx }) =>
          byIndex ? idx === input : keypress === input,
        )

        process.stdout.write(input)
        console.log(`\nexecuting ${cmd.yellow}...`)
        exec(cmd, (err, stdout, stderr) => {
          console.log()
          if (err) throw err
          if (stderr) {
            console.log('stderr:'.red)
            console.error(stderr)
          }
          if (stdout) {
            console.log('stdout:'.green)
            console.log(stdout)
          }
        })
      },
      onMovement(input) {
        if (input.toLowerCase() === 'w' && context.index > 0) context.index--
        else if (input.toLowerCase() === 's' && context.index < maxIndex)
          context.index++
        render(context)
      },
    })
  }
}

run()
