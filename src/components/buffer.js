let buffer = ''
const log_ = (newLine = true) => (...str) =>
  (buffer += `${str.join(' ')}${newLine ? '\n' : ''}`)

export const log = log_(true)
export const logN = log_(false)

export const write = () => {
  console.clear()
  process.stdout.write(buffer)
  buffer = ''
}
