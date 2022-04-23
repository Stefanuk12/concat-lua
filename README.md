# Concat

Concatenates many lua files together, wrapped each one within a `do` block.

## Usage
```bash
Usage: concat-lua [options]

concats lua files

Options:
  -V, --version   output the version number
  -o, --output    set where to output
  -b, --doBlock   do block files (default: true)
  -c, --comments  add comments (default: true)
  -h, --help      display help for command
```

examples:
```bash
concat-lua -o ./out.lua 1.lua 2.lua
```