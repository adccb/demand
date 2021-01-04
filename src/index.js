import render from './renderer.js'
import handleInput from './inputs.js'
import items from './handlers/index.js'
import { getContext } from './components/context.js'
import { getUserInput } from './util.js'
import * as reapers from './reapers/index.js'

const { onMovement } = reapers
const findItem = (input, { byIndex = false } = {}) =>
  items.find(({ keypress, idx }) =>
    byIndex ? idx === input : keypress === input,
  )

render(getContext())
const run = async () => {
  let input
  while ((input = await getUserInput())) {
    await handleInput(input, getContext(), {
      onMovement,
      onCommand: (input, context, options) =>
        reapers.onCommand(findItem(input, options), context),
    })
  }
}

run()
