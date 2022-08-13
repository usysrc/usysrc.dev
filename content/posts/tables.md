---
title: "Tables in Pico8"
date: 2016-07-16T16:50:31+02:00
draft: false
---

![](/images/tables.png)

## The Concatenation Trick

For beginners, I suggest you use concatenation to index 2D arrays. Create a new object in a 2D cell at (i,j) in a table called myArray with the following code:

```lua
myArray[i..","..j] = {}
```

To iterate over all objects in the myArray you can use the pairs iterator. Caution: the objects are not ordered when using pairs!

```lua
for k,v in pairs(myArray) do
	-- v is the cell object
	-- k is a string in the form of "i,j"
end
```

If we want to access the objects in a particular order we should use nested for loops:

```lua
for i=1, 8 do
	for j=1, 8 do
		local cell = myArray[i..","..j] 
		-- do stuff with the cell
	end
end
```

## Objects And Container

![](/images/invaders.gif)

Entities like the spaceship in this gif are objects. Containers for objects are special in Pico-8 because we have a couple of built-in functions to help us manage insertion and deletion. I strongly suggest to use add(), del() and all() for container and entity management.

Create and add an object to a table with add():

```lua
local entities = {}
local player = {
	x = 3,
	y = 3,
	sprite = 5
}
add(entities, player)
```
In your _update or _draw callbacks, you will most likely want to loop over all objects. You should use all() for that:

```lua
for entity in all(entities) do
	-- do stuff here
end
```

You can use del() to remove an object from the container even while iterating over the container:

```lua
for entity in all(entities) do
	del(entities, entity)
end
```

This only works with all() and del() together! This is great for games where you have dynamic objects such as bullets, effects or timed events that are added and removed dynamically.

I hope that these two hints help you to get started with the awesome Pico-8 engine. For advanced users, other methods might be more efficient. I recommend reading the Pico-8 Docs or the PIL for more information.



