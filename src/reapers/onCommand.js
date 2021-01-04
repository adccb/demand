import { getUserInput, execute } from '../util.js'
import * as headers from '../components/headers.js'

export const onCommand = async ({ cmd }, context) => {
  console.log(`executing ${cmd.yellow}...\n`)

  const { stdout, stderr, code } = await execute(cmd)
  console.log(headers.stdout(stdout))
  console.log(headers.stderr(stderr))
  console.log(headers.process(code))

  await getUserInput()
  return context
}
