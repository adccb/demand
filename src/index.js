import gar from 'gar'
import render from './renderer.js'
import handleInput from './inputs.js'
import getItems from './config.js'
import { getContext } from './components/context.js'
import { getUserInput } from './util.js'
import * as reapers from './reapers/index.js'

const { onMovement, onInit, onCommand } = reapers
const findItem = (items, input, { byIndex = false } = {}) =>
  items.find(({ keypress, idx }) =>
    byIndex ? idx === input : keypress === input,
  )

const run = async () => {
  const args = gar(process.argv.slice(2))
  if (args.init) await onInit()

  const { items } = await getItems()

  render(getContext())
  let input
  while ((input = await getUserInput())) {
    await handleInput(input, getContext(), {
      onMovement,
      onKeybind: (_, context) => context,
      onCommand: (input, context, options) =>
        onCommand(findItem(items, input, options), context),
    })
  }
}

run()
