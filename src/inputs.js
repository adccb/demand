import items from './config.js'
import render from './renderer.js'
import { setContext } from './components/context.js'

const quit = ['\u0003', 'q', '\u001b']
const movement = ['w', 's']
const up = ['w']
const down = ['s']
const keybind = ['\r']
const command = items.map(({ keypress }) => keypress)

const is = coll => char => coll.includes(char.toLowerCase())
const isQuit = is(quit)
const isMovement = is(movement)
const isKeybind = is(keybind)
const isCommand = is(command)
export const isUp = is(up)
export const isDown = is(down)

const handleInput = async (
  input,
  context,
  { onCommand, onMovement, onKeybind, beforeQuit = () => Promise.resolve() },
) => {
  const { index } = context

  let newContext = context
  if (isQuit(input)) {
    await beforeQuit()
    process.exit()
  } else if (isKeybind(input)) {
    console.log()
    switch (input) {
      case '\r': {
        newContext = await onCommand(index, context, { byIndex: true })
      }
      default: {
        newContext = onKeybind(input, context)
      }
    }
  } else if (isCommand(input)) {
    process.stdout.write(` ${input.bold.green}\n`)
    newContext = await onCommand(input, context)
  } else if (isMovement(input)) {
    newContext = onMovement(input, context)
  }

  setContext(newContext)
  render(newContext)
}

export default handleInput
