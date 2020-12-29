import items from './handlers/index.js'

const isCommand = char => items.some(({ keypress }) => keypress === char)
const isMovement = char => ['w', 's'].includes(char.toLowerCase())
const isKeybind = char => ['\r'].includes(char)

const handleInput = (input, { index, onCommand, onMovement }) => {
  if (isKeybind(input)) {
    switch (input) {
      case '\r': {
        onCommand(index, { byIndex: true })
      }
    }
  } else if (isCommand(input)) {
    onCommand(input)
  } else if (isMovement(input)) {
    onMovement(input)
  }
}

export default handleInput
