import { isUp, isDown } from '../inputs.js'
import { maxIndex } from '../handlers/index.js'

export const onMovement = (input, { index, ...rest }) =>
  isUp(input) && index > 0
    ? { ...rest, index: index - 1 }
    : isDown(input) && index < maxIndex
    ? { ...rest, index: index + 1 }
    : { ...rest, index }
