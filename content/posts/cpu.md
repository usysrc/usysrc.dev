---
title: "A CPU in Lua"
date: 2014-04-12T17:13:34+02:00
---
This post was originally published on blog.headchant.com but was edited and moved here in 2022.

It might be interesting to implement a small register based VM in Lua. Lets start by considering the architecture of a register machine.

# The NOP machine

If we look at how existing Register Machines are designed for example the  or the Lua VM itself, we see a few things:

- some registers
- a program
- something that executes the program

The last part will be the point of entry for the lua program itself but also decide the core features of the design.
The memory

We can reduce most of our design problems by answering the question: how is it stored?

Most often there is a counter that is being used to fetch the program from memory. This counter is sometimes called the program counter or short PC. In Lua we can represent the memory as a flat table and the PC as a number type.

```lua
local MEM = {}
local PC = 0
```

# The registers

A data registers is a small storage cell defined by it’s name (address), wordlength and content. In the [DCPU-16 Spec](https://raw.githubusercontent.com/gatesphere/demi-16/master/docs/dcpu-specs/dcpu-1-7.txt), for example, the wordlength is 16 bit and there are 8 registers named A,B,C… and correspond to the values 0x00-0x07.

We use simple variables and init them with numbers to represent our registers:

```lua
local registers = {
    A = 0,
    B = 0,
    C = 0,
    D = 0
}
```

The registers table is used later to access the registers more elegantly.
Opcodes and operands

Instructions might be represented as byte sequences in the memory and can be a instruction like NOP. It can also be a operand that is only meaningful in conjuction with a opcode like MOV A, c (move constant c into the register A).

We represent instructions as lua functions in a table where the keys represent the bytecode of the opcode:

```lua
local opcodes = {
    ["0x00"] = function() -- NOP
    end,
}
```

# Fetch and Execute

We need to establish a cycle to read out the instruction and fetch the opcode.

First step is easy. We offset our instruction register

```lua
PC = PC + 1
```

Then read out the current instruction at the location of the program counter into our instruction register

```lua
local IR = MEM[PC]
```

Since our opcodes are stored in a table where the opcodes are keys we can easily decode the opcode by addressing the table and then executing it:

```lua
opcodes[IR]()
```

This whole process can be completed and simplified into a function that uses a while loop that checks if the PC has reached the end of the program memory.

```lua
local FDX = function()
    while PC < #MEM do
        PC = PC + 1
        local IR = MEM[PC]
        opcodes[IR]()
    end
end
```

We will add some print statements for better insight in our little cpu:

```lua
local FDX = function()
    print("PC", "IR")
    while PC < #MEM do
        PC = PC + 1
        local IR = MEM[PC]
        opcodes[IR]()
        print(PC, IR)
    end
end
```

If you want to test the program you can just fill the memory with a program and execute the FDX function:

```lua
-- TEST

MEM = {
    "0x00",
    "0x00",
    "0x00"
}

FDX()
```

This will output something like: PC IR 1 0x00 2 0x00 3 0x00

Great! Now our machine finally does…nothing.
Fetch operands

In order to implement operands we need to introduce a new fetch function into our program:

```lua
local fetch = function()
    PC = PC + 1
    return MEM[PC]
end
```

We can change the FDX function to use the fetch function and also print out the A register:

```lua
local FDX = function()
    print("PC", "IR", "A")
    while PC < #MEM do
        local IR = fetch()
        opcodes[IR]()
        print(PC, IR, registers.A)
    end
end
```

Define it somewhere above the opcodes because we will need to use it to get the operands. But first we need to create a conversion table for the operands to bytecode:

```lua
local operands = {
    ["0x00"] = "A",
    ["0x01"] = "B",
    ["0x02"] = "C",
    ["0x03"] = "D",
}
```

We now add the MOV R, c instruction to the opcodes table:

```lua
local opcodes = {
    ["0x00"] = function() -- NOP
    end,
    ["0x01"] = function() -- MOV R, c
        local A = operands[fetch()]
        local c = fetch()
        registers[A] = tonumber(c)
    end
}
```

We change our testprogram to: MEM = { “0x00”, “0x01”, “0x00”, “0x01” “0x00” }

Our output then tells us that our A register is being filled with 1.
```
PC  IR      A
1   0x00    0
4   0x01    0x01
5   0x00    0x01
```

# JMP around

Just to show how to extend this, I added three more instructions: ADD, SUB, JMP and IFE. JMP sets the program counter to a specific address. IFE adds 3 to the PC if two registers are equal.

```lua
local opcodes = {
    ["0x00"] = function() -- NOP
    end,
    ["0x01"] = function() -- MOV R, c
        local A = operands[fetch()]
        local c = fetch()
        registers[A] = tonumber(c)
    end,
    ["0x02"] = function() -- ADD R, r
        local R = operands[fetch()]
        local r = operands[fetch()]
        registers[R] = registers[R] + registers[r]
    end,
    ["0x03"] = function() -- SUB R, r
        local R = operands[fetch()]
        local r = operands[fetch()]
        registers[R] = registers[R] - registers[r]
    end,
    ["0x04"] = function() -- JMP addr
        local addr = fetch()
        PC = tonumber(addr)
    end,
    ["0x05"] = function() -- IFE R, r
        local R = registers[operands[fetch()]]
        local r = registers[operands[fetch()]]
        PC = (R == r) and PC + 3 or PC
    end
}

-- TEST machine

MEM = {
    "0x00", -- NOP
    "0x01", "0x01", "0x05", -- MOV B, 5
    "0x01", "0x02", "0x01", -- MOV C, 1
    "0x02", "0x00", "0x02", -- ADD A, C
    "0x05", "0x00", "0x01", -- IFE A, B
    "0x04", "0x7", -- JMP 1
    "0x00",
    "0x00"
}
```

Now we have a small loop that counts to 5 and then stops! Yeah!
```
PC  IR  A   B
1   0x00    0   0   0
4   0x01    0   5   0
7   0x01    0   5   1
10  0x02    1   5   1
13  0x05    1   5   1
7   0x04    1   5   1
10  0x02    2   5   1
13  0x05    2   5   1
7   0x04    2   5   1
10  0x02    3   5   1
13  0x05    3   5   1
7   0x04    3   5   1
10  0x02    4   5   1
13  0x05    4   5   1
7   0x04    4   5   1
10  0x02    5   5   1
16  0x05    5   5   1
17  0x00    5   5   1
```

# Conclusion

There is still a lot of room for experimentation: Write an assembler. Handle errors, add your own instructions and make small programs with them. Try to enforce the register sizes or maybe create "stack and add" subroutines. You could also try to create opcodes with different cycle length or implement a small pipeline (and then resolve stalls).
