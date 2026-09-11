# JavaScript — `call()`, `apply()` & `bind()`

## 1. Why do we need them?

The main purpose of `call()`, `apply()`, and `bind()` is to **control the value of `this` inside a normal function**.

Example:

```js
let user1 = {
    firstname: "Akshay",
    lastname: "Saini"
};

let user2 = {
    firstname: "Sachin",
    lastname: "Tendulkar"
};

function printName() {
    console.log(this.firstname, this.lastname);
}
```

We want to use the **same function** with different objects.

---

# 2. `call()`

### What it does

`call()`:

1. Sets `this` to the object we provide.
2. Immediately executes the function.

```js
printName.call(user1);
```

Think:

```text
printName.call(user1)
        ↓
    this = user1
        ↓
   function runs
```

### With arguments

```js
function printName(city, state) {
    console.log(this.firstname, city, state);
}

printName.call(user1, "Ahmedabad", "Gujarat");
```

### Syntax

```js
function.call(object, arg1, arg2, ...);
```

---

# 3. `apply()`

### What it does

`apply()` works almost exactly like `call()`:

* Sets `this`
* Immediately executes the function

### Main difference

Arguments are passed as an **array**.

```js
printName.apply(
    user1,
    ["Ahmedabad", "Gujarat"]
);
```

### Compare

```js
// call → arguments separately
printName.call(user1, "Ahmedabad", "Gujarat");

// apply → arguments in an array
printName.apply(user1, ["Ahmedabad", "Gujarat"]);
```

### Syntax

```js
function.apply(object, [arg1, arg2, ...]);
```

---

# 4. `bind()`

### What it does

`bind()` also sets `this`, but it **does NOT execute the function immediately**.

Instead, it creates a **new function**.

```js
let newFunction = printName.bind(user1);
```

Think:

```text
printName.bind(user1)
        ↓
  new function created
        ↓
   stored in newFunction
        ↓
   execute when needed
```

Then:

```js
newFunction();
```

Now:

```text
this = user1
```

### With arguments

```js
let newFunction = printName.bind(
    user1,
    "Ahmedabad",
    "Gujarat"
);

newFunction();
```

The new function remembers:

```text
this  → user1
city  → Ahmedabad
state → Gujarat
```

---

# 5. `call()` vs `apply()` vs `bind()`

| Method    | Sets `this` | Executes immediately? | Arguments  |
| --------- | ----------- | --------------------- | ---------- |
| `call()`  | ✅           | ✅ Yes                 | Separately |
| `apply()` | ✅           | ✅ Yes                 | Array      |
| `bind()`  | ✅           | ❌ No                  | Separately |

### Memory Trick

```text
CALL
→ Call NOW

APPLY
→ Call NOW + arguments as Array

BIND
→ Create function → Call LATER
```

---

# 6. Function Borrowing

Using one function with different objects is called **function borrowing**.

```js
let user1 = {
    firstname: "Akshay"
};

let user2 = {
    firstname: "Sachin"
};

function printName() {
    console.log(this.firstname);
}
```

Use the same function with `user1`:

```js
printName.call(user1);
```

Use it with `user2`:

```js
printName.call(user2);
```

Same function:

```text
        printName()
        /        \
       /          \
   user1          user2
     ↓              ↓
   Akshay         Sachin
```

---

# 7. Connection with `this`

Normally, when a normal function is called as an object method:

```js
let user = {
    name: "Ketan",

    printName() {
        console.log(this.name);
    }
};

user.printName();
```

JavaScript determines:

```text
this = user
```

But with `call()` we can explicitly choose `this`:

```js
printName.call(user);
```

Meaning:

```text
"Run printName and make this = user."
```

---

# 8. Important: Arrow Functions

Arrow functions work differently.

```js
let fn = () => {
    console.log(this);
};
```

Arrow functions **do not have their own `this`**.

They inherit `this` from their surrounding scope.

Therefore:

```js
fn.call(user);
fn.apply(user);
fn.bind(user);
```

do **not** change the arrow function's `this` like they do for a normal function.

### Remember

```text
Normal function
→ has its own `this`
→ call/apply/bind can control it

Arrow function
→ does not have its own `this`
→ inherits `this` from outside
```

---

# 9. Final Quick Revision

## `call()`

```js
fn.call(obj, a, b);
```

**Set `this` + execute NOW**

---

## `apply()`

```js
fn.apply(obj, [a, b]);
```

**Set `this` + execute NOW + arguments as array**

---

## `bind()`

```js
let newFn = fn.bind(obj, a, b);
```

**Set `this` + create NEW function + execute LATER**

---

# ⭐ The One Concept to Remember

All three are mainly about:

> **"Which object should `this` refer to?"**

```text
call()
   ↓
this = object
   ↓
run now


apply()
   ↓
this = object
   ↓
run now


bind()
   ↓
this = object
   ↓
create new function
   ↓
run later
```

### Super-short memory

```text
call  → NOW
apply → NOW + ARRAY
bind  → LATER
```
