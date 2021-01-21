import { isUp, isDown } from '../inputs.js'
import getItems from '../config.js'

export const onMovement = async (input, { index, ...rest }) => {
  const { maxIndex } = await getItems()

  return isUp(input) && index > 0
    ? { ...rest, index: index - 1 }
    : isDown(input) && index < maxIndex
    ? { ...rest, index: index + 1 }
    : { ...rest, index }
}
