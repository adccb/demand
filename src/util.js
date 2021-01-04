import { exec } from 'child_process'

// prepare stdin
process.stdin.setRawMode(true)
process.stdin.setEncoding('utf8')
process.stdin.resume()

export const getUserInput = () =>
  new Promise(res => {
    process.stdin.on('data', function cont(key) {
      res(key)
      process.stdin.removeListener('data', cont)
    })
  })

export const execute = cmd =>
  new Promise((res, rej) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) rej(err)
      res({ stderr, stdout, code: err ? err.code : 0 })
    })
  })

export const join = (delim, ...words) =>
  words ? words => join(delim, words) : words.join(delim)

export const joinSpace = join(' ')
