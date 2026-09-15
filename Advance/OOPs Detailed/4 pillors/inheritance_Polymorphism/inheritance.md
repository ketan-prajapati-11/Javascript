# JavaScript Inheritance — Notes

## What is Inheritance?

Inheritance lets one class (child/subclass) reuse the properties and methods of another class (parent/superclass), instead of rewriting them from scratch.

```javascript
class Car {
    constructor(brand, color){
        this.brand = brand
        this.color = color
    }
    start(){ console.log(`${this.brand} is starting...`) }
    stop(){ console.log(`${this.brand} is stopping...`) }
}

class ElectricCar extends Car {
    constructor(brand, color, charging){
        super(brand, color)
        this.charging = charging
    }
    showCharging(){ console.log(`${this.charging} is current charging`) }
}
```

`ElectricCar` gets `start()` and `stop()` for free from `Car`, without redefining them.

---

## `extends`

The `extends` keyword sets up the inheritance link between two classes. It makes the child class's prototype point to the parent class's prototype (see Prototype Chain below).

```javascript
class Child extends Parent { }
```

---

## `super()` — calling the parent constructor

Inside a child class's constructor, `super()` calls the **parent's constructor**.

### Rule 1: `super()` must come before using `this`

```javascript
class ElectricCar extends Car {
    constructor(brand, color, charging){
        super(brand, color) // ✅ must be first
        this.charging = charging
    }
}
```

If you try to use `this` before calling `super()`, JS throws:
```
ReferenceError: Must call super constructor before accessing 'this' or returning from derived constructor
```
This happens because in a derived class, `this` doesn't exist until `super()` runs and initializes the object.

### Rule 2: `super()` must match the DIRECT parent's constructor — not the grandparent's

This is a common confusion point. Each level only needs to satisfy its **immediate parent's** constructor signature — not skip ahead to an earlier ancestor.

```javascript
class Car {
    constructor(brand, color){ this.brand = brand; this.color = color }
}
class ElectricCar extends Car {
    constructor(brand, color, charging){
        super(brand, color)   // passes up to Car
        this.charging = charging
    }
}
class BMW1 extends ElectricCar {
    constructor(brand, color, charging, model){
        super(brand, color, charging)  // must match ElectricCar's constructor, NOT Car's
        this.model = model
    }
}
```

Think of it as **relay passing**:
```
BMW1        → super(brand, color, charging) →  ElectricCar
ElectricCar → super(brand, color)           →  Car
Car         → sets this.brand, this.color
ElectricCar → sets this.charging
BMW1        → sets this.model
```

If `BMW1` only called `super(brand, color)` (skipping `charging`), then `charging` would never reach `ElectricCar`, and `this.charging` would end up `undefined` — even though `BMW1`'s constructor received it correctly as a parameter.

---

## `super.method()` — calling a parent's method

Different from `super()`. Used inside **any method** (not just the constructor) to call a specific method from the parent class.

```javascript
class Animal {
    speak(){ console.log("Animal makes a sound") }
}
class Dog extends Animal {
    speak(){
        super.speak()             // calls Animal's speak()
        console.log("Dog barks")  // adds Dog's own behavior
    }
}
new Dog().speak()
// Animal makes a sound
// Dog barks
```

| | `super()` | `super.method()` |
|---|---|---|
| Calls | Parent's constructor | A specific parent method |
| Where | Only inside a constructor | Inside any method |
| Position rule | Must be the first line | Can be anywhere in the method |

---

## Inheritance flows one way — downward only

A child gets everything from its parent. The parent gets **nothing** from the child.

```javascript
const oldcar = new Car("OD", "white")
oldcar.showCharging() // ❌ TypeError: oldcar.showCharging is not a function
```
`showCharging` only exists on `ElectricCar.prototype`. `oldcar`'s prototype chain never reaches it.

---

## `instanceof`

Checks whether a class's prototype appears anywhere in an object's prototype chain.

```javascript
const bmw = new ElectricCar("BMW", "black", 22)
console.log(bmw instanceof Car)         // true
console.log(bmw instanceof ElectricCar) // true

const gt1 = new BMW1("BMW", "Black", 22, "GT1")
console.log(gt1 instanceof Car)          // true — chain goes all the way up
console.log(gt1 instanceof ElectricCar)  // true
console.log(gt1 instanceof BMW1)         // true
```

---

## Prototype & Prototype Chain (how inheritance actually works under the hood)

- **Prototype**: a live link from one object to another, used to look up properties/methods that aren't found directly on the object. It's a **link**, not a copy — if the prototype's method changes later, linked objects see the change immediately.
- **Prototype chain**: the path JS follows to find something — object → its prototype → that prototype's prototype → ... → `Object.prototype` → `null`.

```javascript
const animal = { speak(){ console.log("sound") } }
const dog = Object.create(animal) // dog is empty; its prototype = animal
dog.speak() // "sound" — found by walking the chain
```

`class`/`extends` is syntactic sugar over this exact mechanism: writing `class Dog extends Animal` makes `Dog.prototype`'s prototype equal to `Animal.prototype` automatically.

### Lookup order example

```javascript
gt1.showCharging()
```
1. Does `gt1` itself have `showCharging`? No
2. Does `BMW1.prototype` have it? No
3. Does `ElectricCar.prototype` have it? **Yes** → stop, run it
4. (Never reaches `Car.prototype` or beyond, since it already found a match)

If nothing is ever found, the chain ends at `null`, and you get `undefined` (for a property) or a `TypeError` (for a method call).

---

## Method Overriding

A child class can define a method with the **same name** as one in the parent — this replaces the parent's version for instances of that child.

```javascript
class Cat extends Animal {
    speak(){ console.log("Cat sound") } // overrides Animal's speak()
}
```

This is the mechanism behind **polymorphism** — same method call, different behavior depending on which class actually defines (or overrides) it.

---

## Why plain objects `{}` can't have multiple instances

```javascript
const animal = { name: "Generic" }
new animal() // ❌ TypeError: animal is not a constructor
```

An object literal is a single, already-built object — not a blueprint. Classes (or constructor functions) exist to act as **factories**, producing independent instances via `new`.

```javascript
class Animal {
    constructor(name){ this.name = name }
}
const a1 = new Animal("Rex")
const a2 = new Animal("Max")
a1 === a2 // false — separate instances sharing the same prototype
```

---

## Interview Questions & Answers

1. **Difference between `super()` and `super.method()`?**
   `super()` calls the parent's constructor (constructor-only, must be first line). `super.method()` calls a specific parent method (usable anywhere in any method).

2. **What happens if you don't call `super()` in a derived constructor?**
   `ReferenceError` — `this` can't be used until `super()` initializes it.

3. **What is method overriding?**
   A child class redefining a parent's method; the child's version is used for its instances.

4. **How does `instanceof` work?**
   Checks if the given class's prototype exists anywhere in the object's prototype chain.

5. **Can a subclass access a parent's private (`#`) fields?**
   No — `#fields` are only accessible inside the class that defines them, not even by subclasses.

6. **Classical inheritance (Java/C++) vs JS prototype-based inheritance?**
   JS objects inherit directly from other objects via prototype links; `class`/`extends` are just cleaner syntax over this mechanism — there's no true "class blueprint" copying happening.

7. **Can you override a method but still use the parent's original logic?**
   Yes — call `super.methodName()` inside the override to run the parent's logic, then add more.

8. **What determines which method JS runs when there are multiple versions across the inheritance chain?**
   JS walks up the prototype chain and uses the **first match** it finds, starting from the object itself.

---

## Quick Mental Models

- `super()` → a **relay pass** of constructor parameters, one level at a time — each level only needs to satisfy its *direct* parent.
- Prototype chain → like **asking up a chain of people**: if person 1 doesn't know, ask person 2, then person 3... `null` means "nobody left to ask."
- Inheritance → flows **downward only**: children get parent features, parents never get child features.