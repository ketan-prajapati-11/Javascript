# JavaScript Polymorphism — Notes

## What is Polymorphism?

**"Poly" = many, "morph" = forms.**

Polymorphism means the **same method call** can produce **different behavior**, depending on the actual object it's called on.

```javascript
a.speak() // same syntax, different result depending on what "a" actually is
```

It is a *result* of the prototype chain — not a separate mechanism. Same call, different chain, different method found first, different output.

---

## Types of Polymorphism (general OOP theory)

| Type | Also called | Decided when? | Supported in JS? |
|---|---|---|---|
| Runtime polymorphism | Dynamic polymorphism | While the program runs | ✅ Yes |
| Compile-time polymorphism | Static polymorphism / Method overloading | Before the program runs, based on method signature | ❌ No (not natively) |

**In practice, JavaScript only supports runtime polymorphism.**

---

## 1. Runtime Polymorphism — Method Overriding

A subclass redefines a method from its parent. JS decides which version to run **at the moment the call happens**, by walking the prototype chain and using the first match it finds.

```javascript
class Animal {
    speak(){ console.log("Animal makes a sound") }
}

class Dog extends Animal {
    speak(){ console.log("Dog barks") }
}

class Cat extends Animal {
    speak(){ console.log("Cat meows") }
}

class Bird extends Animal {
    // no override — falls back to Animal's speak()
}

const animals = [new Dog(), new Cat(), new Bird()]
animals.forEach(a => a.speak())
```

Output:
```
Dog barks
Cat meows
Animal makes a sound
```

- `Dog` and `Cat` override `speak()` → their own version runs.
- `Bird` has no override → chain climbs up and finds `Animal.prototype.speak`.

### Extending instead of replacing — `super.method()`

```javascript
class Dog extends Animal {
    speak(){
        super.speak()            // run parent's version too
        console.log("Dog barks") // then add child's own behavior
    }
}
```
Output:
```
Animal makes a sound
Dog barks
```

---

## 2. Duck Typing (polymorphism without inheritance)

JS is dynamically typed — it doesn't check an object's class before calling a method. It just checks: **"does this object have this method? If yes, call it."**

```javascript
const dog = { speak(){ console.log("Woof") } }
const robot = { speak(){ console.log("Beep boop") } }
const alien = { speak(){ console.log("Zzzrt") } }

const things = [dog, robot, alien]
things.forEach(t => t.speak())
```

Output:
```
Woof
Beep boop
Zzzrt
```

None of these objects are related by class or `extends` — polymorphism still works purely because each object happens to have a `speak()` method.

> "If it walks like a duck and quacks like a duck, treat it like a duck." — you don't care what class it technically belongs to, only whether it has the method you need.

This matters more in JS than in strictly-typed languages, because JS never enforces types/interfaces — everything is checked at runtime.

---

## What JS Does NOT Support

**Compile-time polymorphism / Method Overloading** — having multiple versions of the same method name with different parameters, where the correct one is picked automatically based on arguments.

```java
// Valid in Java — NOT valid in JS
void speak(){ }
void speak(String sound){ }
```

In JS, defining the same method name twice just **overwrites** the first one — there's no automatic selection based on arguments:

```javascript
class Animal {
    speak(){ console.log("generic sound") }
    speak(sound){ console.log(sound) } // this silently replaces the one above
}
```

You *can* fake overloading manually:
```javascript
speak(sound){
    if (sound === undefined) console.log("generic sound")
    else console.log(sound)
}
```
But this is a manual workaround, not a language feature.

---

## Why Polymorphism Is Useful

Without it, you'd need ugly type-checking everywhere:

```javascript
animals.forEach(a => {
    if (a instanceof Dog) console.log("Dog barks")
    else if (a instanceof Cat) console.log("Cat meows")
    else console.log("Animal makes a sound")
})
```

With polymorphism, you just call `.speak()` and trust each object to respond correctly — no type checks needed. This makes code shorter, easier to extend (add a new class, no need to touch the loop), and easier to maintain.

---

## Interview Summary Line

> "JavaScript supports **runtime polymorphism** through method overriding (via the prototype chain) and duck typing, but it does **not** support compile-time polymorphism / method overloading like Java or C++."

---

## Quick Recap Table

| Concept | Example | Mechanism |
|---|---|---|
| Method overriding | `Dog.speak()` replaces `Animal.speak()` | Prototype chain — first match wins |
| `super.method()` | Calls parent's version *and* adds more | Explicit call up the chain |
| Duck typing | Unrelated objects sharing a method name | No inheritance needed — just checks if method exists |
| Method overloading | Same method, different params, auto-picked | ❌ Not supported in JS |