## Every object has an internal link to another object, and that linked-to object is called its prototype.

# JavaScript Prototypes — Reference Notes

---

## 1. What is a Prototype?

**Definition:**
Every JavaScript object has an internal, hidden link to another object. That linked-to object is called its **prototype**. This internal link is written as `[[Prototype]]` in the spec (double brackets = internal, not directly accessible by that name in code).

```js
Object.getPrototypeOf(obj);   // ✅ correct way to read it
obj.__proto__;                // ⚠️ older way, works but discouraged
```

**Exception:** The chain has to stop somewhere.
- `Object.prototype`'s own prototype is `null`.
- You can also deliberately create an object with *no* prototype:
```js
let bare = Object.create(null);
Object.getPrototypeOf(bare); // null
```

So the precise version:
> Every object has an internal link (`[[Prototype]]`) to another object — its prototype — **except** objects at the top of the chain (`Object.prototype` → `null`) or ones made with `Object.create(null)`.

---

## 2. The Prototype Chain

When you access a property on an object, JS searches like this:

1. Does the object **itself** have this property (an "own" property)? → use it, **stop**.
2. If not, check its `[[Prototype]]`.
3. If not found there, check *that* object's `[[Prototype]]`.
4. ...keep going until you hit `null`.
5. If never found → `undefined`.

This search path is the **prototype chain**.

```js
let animal = { eats: true };
let rabbit = Object.create(animal);

rabbit.eats;   // true → not on rabbit, found on animal (its prototype)
rabbit.hops;   // undefined → not found anywhere in the chain
```

---

## 3. `obj.[[Prototype]]` vs `Function.prototype` — Don't Confuse These

This is the single biggest source of confusion. There are **two different things** that share the word "prototype":

| Concept | What it is | Who has it |
|---|---|---|
| `[[Prototype]]` (internal link) | Every object's hidden pointer to the object it inherits from | **Every object** |
| `SomeFunction.prototype` | An ordinary **property** on a function, which holds the object that becomes new instances' `[[Prototype]]` | **Only functions** |

```js
function BankAccount(holderName, balance) {
  this.holderName = holderName;
  this.balance = balance;
}

let ajayAccount = new BankAccount("ajay", 150);

// ajayAccount's internal [[Prototype]] link points to BankAccount.prototype:
Object.getPrototypeOf(ajayAccount) === BankAccount.prototype; // true
```

So: `BankAccount.prototype` is just a regular object sitting there. `new BankAccount()` is what wires up `ajayAccount`'s internal link to point at it.

---

## 4. How Method Calls Set `this` (Dot Notation Rule)

> **Whatever is immediately before the dot in a call becomes `this` inside the function.**

```js
obj.method();   // this === obj, automatically. No .call() needed.
```

This is *why* `s1.printName()` works and gives you `s1`'s data — `printName` lives on the prototype, but calling it *through* `s1` (`s1.printName()`) makes `this` = `s1`.

```js
class Student {
  printName() {
    console.log(this.name, this.age);
  }
}

let s1 = new Student("Ram", 22, "Delhi");
s1.printName(); // this === s1 → works, no .call() needed
```

---

## 5. When You DO Need `.call()` / `.apply()` / `.bind()`

Dot notation binds `this` automatically **only** when you call the method directly off the object. You need `.call()` etc. when that link gets broken.

### Case A — Detached function reference
```js
const fn = s1.printName;
fn();          // this is undefined/global — NOT s1, the link is lost
fn.call(s1);   // this === s1 again ✅
```

### Case B — Calling a prototype method directly (not through an instance)
```js
let s3 = { name: "Raju", age: 20 };

Student.prototype.printName(s3);
// ❌ this === Student.prototype (whatever is before the dot!)
// s3 here is just a normal ARGUMENT, not `this` — and since printName()
// doesn't even declare a parameter, s3 is silently ignored.
// Output: undefined undefined

Student.prototype.printName.call(s3);
// ✅ this === s3 explicitly set via .call()
// Output: Raju 20
```

### Case C — Passing a method as a callback
```js
setTimeout(s1.printName, 1000); // loses binding to s1 — same issue as Case A
```

**Quick distinction table:**

| Code | What `this` becomes | Why |
|---|---|---|
| `obj.method()` | `obj` | dot notation auto-binds |
| `Class.prototype.method(x)` | `Class.prototype` | `x` is just an argument, not `this` |
| `Class.prototype.method.call(x)` | `x` | `.call()` explicitly sets `this` |
| `const f = obj.method; f();` | `undefined` / global | reference detached from `obj` |

---

## 6. Shadowing: Own Properties Hide Prototype Properties

If you define the **same-named property** both as an own property (`this.x = ...` in the constructor) *and* on the prototype (`Ctor.prototype.x = ...`), the constructor's own version **always wins** for instances — silently, with no error.

```js
function BankAccount(holderName, balance) {
  this.holderName = holderName;
  this.balance = balance;

  // OWN property — created fresh on every instance
  this.deposit = function (amount) {
    console.log(`${this.holderName} deposited ${amount}`);
  };
}

// PROTOTYPE property — shared, but unreachable if own property exists
BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};

let ajayAccount = new BankAccount("ajay", 150);
ajayAccount.deposit(2100);
// Runs the CONSTRUCTOR's version only (just logs, balance unaffected).
// The prototype's version never runs — it's shadowed, not broken.
```

**Why:** the prototype chain search stops at the *first* match. Since `ajayAccount` has its own `deposit`, JS never even looks at `BankAccount.prototype.deposit`.

**Fixes:**
```js
// Option 1: keep the logic in ONE place only (usually the prototype)
BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
  console.log(`${this.holderName} deposited ${amount}`);
};

// Option 2: explicitly call the prototype version from the instance version
this.deposit = function (amount) {
  console.log(`${this.holderName} deposited ${amount}`);
  BankAccount.prototype.deposit.call(this, amount);
};
```

---

## 7. Quick-Reference Summary

- **Prototype** = the object your object internally links to, for inherited properties/methods.
- **Prototype chain** = the lookup path JS follows (own property → prototype → prototype's prototype → ... → `null`).
- **`obj.method()`** auto-sets `this` to `obj`. This is the default/normal case — no `.call()` needed.
- **`.call()` / `.apply()` / `.bind()`** are needed only when the function gets called *without* the `obj.` in front of it (detached reference, callback, or calling straight off a `.prototype` object).
- **`Function.prototype`** ≠ an object's internal `[[Prototype]]`. The function's `.prototype` property is what *becomes* the internal `[[Prototype]]` of instances made with `new`.
- **Own properties shadow prototype properties** of the same name — defining `this.x` in the constructor makes `x` on the prototype invisible to that instance, not "combined" with it.
- Generally: put **shared behavior (methods)** on the `prototype`, and **per-instance data** as own properties in the constructor. Avoid duplicating the same name in both places unless you mean to override it.

---

## 8. Mini Practice Checklist

When you see `this` acting "wrong," ask:
- [ ] Was this called as `obj.method()` (dot notation)? → `this` = `obj`.
- [ ] Was it called as a bare function reference (`const f = obj.method; f()`)? → `this` is lost, needs `.call()`/`.bind()`.
- [ ] Was it called directly off a `.prototype` object (`Ctor.prototype.method(x)`)? → `this` = the prototype object, `x` is just an argument.
- [ ] Does the instance have an **own property** with the same name as something on the prototype? → the own property wins, silently.