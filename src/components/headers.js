export const stdout = stdout =>
  stdout
    ? 'stdout:'.green + '\n' + stdout
    : 'stdout:'.green.dim + ' ∅'.blue.dim + '\n'

export const stderr = stderr =>
  stderr
    ? 'stderr:'.red + '\n' + stderr
    : 'stderr:'.red.dim + ' ∅'.blue.dim + '\n'

export const process = code =>
  `process exited with code ${String(code).yellow.dim} ;; ${
    'ready for additional input'.grey
  }`.grey
