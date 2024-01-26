---
title: "Lua Ternary Idiom"
date: 2024-01-26T16:40:00+02:00
---

# Lua Ternary Idiom

## Ternary by Precedence

You can find ternary operators in other languages in the following form:

```sh
d = a ? b : c
```

In Lua logical operators and their precedence can be used to achieve the same:

```lua
d = a and b or c
```

Written out with `if` it would look like this:

```lua
if a then
  d = b
else
  d = c
end
```

If `a` is `true` then `b` will be assigned to `d`. But if `a` is `false` then `c` will be assigned to `d`.
As a basic rule I like to remember that 'or' returns the first value and `and` returns the second value.

Note that this can also come in handy for other idioms such as default values. But I would advise against constructing complicated logical return structures this way for the sake of readability. 

