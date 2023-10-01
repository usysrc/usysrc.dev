---
title: "TIC80"
date: 2022-07-10T12:47:32+02:00
---

## TIC80 - External Editor
To get a better experience to edit the sprites and maps while also editing the code in an external editor we can use `require`.

# How to require a file
Sadly lua `require` does not work the way as expected in TIC-80. We need to add the package path.

```lua
package.path = package.path .. ";/Users/tilmannhars/Library/Application Support/com.nesbox.tic/TIC-80/?.lua"
require "game"
```

