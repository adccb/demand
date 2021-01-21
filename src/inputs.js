import getItems from './config.js'
import render from './renderer.js'
import { setContext } from './components/context.js'

const is = coll => char => coll.includes(char.toLowerCase())

const up = ['w']
const down = ['s']
export const isUp = is(up)
export const isDown = is(down)

const getMatchers = async () => {
  const { items } = await getItems()

  const quit = ['\u0003', 'q', '\u001b']
  const movement = ['w', 's']
  const keybind = ['\r']
  const command = items.map(({ keypress }) => keypress)

  const isQuit = is(quit)
  const isMovement = is(movement)
  const isKeybind = is(keybind)
  const isCommand = is(command)

  return { isQuit, isMovement, isKeybind, isCommand }
}

const handleInput = async (
  input,
  context,
  { onCommand, onMovement, onKeybind, beforeQuit = () => Promise.resolve() },
) => {
  const { index } = context
  const { isQuit, isMovement, isKeybind, isCommand } = await getMatchers()

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
    newContext = await onMovement(input, context)
  }

  setContext(newContext)
  render(newContext)
}

export default handleInput
