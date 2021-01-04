# demand

demand is a configurable one-key task runner for various shell commands and language/package manager commands.

## installation

```sh
$ git clone https://github.com/mxtetrachord/demand && cd demand
$ alias demand='node ~/path/to/here/src/index.js'
$ demand --init
$ cat ~/.config/demand/items.js
module.exports = {
  custom: {},
  git: {
    g: { title: 'status', cmd: 'git status' },
    d: { title: 'diff', cmd: 'git diff' },
    D: { title: 'diff-cached', cmd: 'git diff --cached' },
  },
  npm: {},
  python: {},
}

$ echo "yay"
```

## usage

if you used the alias technique, just run `$ demand` and see the normal demand window; there are instructions printed at the top, and you'll see your configured items from your `.config/demand/items.js`. they'll be assigned a key command based on their keys in the hash they're attached to (so e.g. `config.npm.g` will represent the command that runs on `g`).

any valid shell works for `cmd`s, with the understanding that i'm running everything through `child_process.exec` so any gotchas there will be gotchas here too.


![action shot](https://github.com/mxtetrachord/demand/blob/master/before.png?raw=true)

![action shot](https://github.com/mxtetrachord/demand/blob/master/after.png?raw=true)
