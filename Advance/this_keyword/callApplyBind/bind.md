# Why `console.log(kolkata)` Shows the Previous Function

When you write:

```js
let kolkata = cityView.bind(city4, "rasogula", "bmvplace");

console.log(kolkata);
```

`console.log(kolkata)` shows the **function itself**.

## Why?

`bind()` creates a **new function based on `cityView`**. It does not execute `cityView()` immediately.

Think of it like:

```text
cityView
   ↓ bind()
new bound function → kolkata
   ↓
remembers:
this = city4
arguments = "rasogula", "bmvplace"
```

So:

```js
console.log(kolkata);
```

means:

> "Show me what `kolkata` contains."

Since `kolkata` contains a function, the console may show something like:

```text
ƒ bound cityView() { ... }
```

It can look like the previous `cityView` function because the new bound function is created from `cityView`.

## `console.log()` vs `()`

```js
console.log(kolkata); // Shows the function itself
kolkata();            // Executes the function
```

### Remember

```text
bind()       → creates a new function
console.log  → shows the function
kolkata()    → executes the function
```

**Important:** `kolkata` is **not the old `cityView` function**. It is a **new bound function** that remembers the specified `this` and arguments.
