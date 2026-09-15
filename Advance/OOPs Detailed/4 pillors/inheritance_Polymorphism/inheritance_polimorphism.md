# JavaScript Inheritance, Prototypes & Polymorphism — Notes

## 1. Classes & `extends`

`extends` lets a child class use the properties/methods of a parent class.

```javascript
class Car {
    constructor(brand, color){
        this.brand = brand
        this.color = color
    }
    start(){ console.log(`${this.brand} is starting...`) }
}

class ElectricCar extends Car {
    constructor(brand, color, charging){
        super(brand, color) // must call parent constructor first
        this.charging = charging
    }
}
```

## 2. `super()` vs `super.method()`

| | `super()` | `super.method()` |
|---|---|---|
| Calls | Parent's **constructor** | A specific **method** from parent |
| Where used | Only inside a constructor | Inside any method |
| Must be first? | Yes — before using `this` | No — can be anywhere in the method |

**Rule:** `super()` must match whatever parameters the **direct parent's constructor** expects — not the "original" grandparent's constructor. Each level passes its own params up to the next level (like a relay).

```javascript
class BMW1 extends ElectricCar {
    constructor(brand, color, charging, model){
        super(brand, color, charging) // must match ElectricCar's constructor signature
        this.model = model
    }
}
```

If you skip a required param in `super()`, that property becomes `undefined` in the parent — even if you received it in the child constructor.

## 3. Why `super()` must come before `this`

In a derived class, `this` isn't created until `super()` runs. Using `this` before calling `super()` throws:
`ReferenceError: Must call super constructor before accessing 'this'`

## 4. Inheritance only flows downward

Child classes get everything from the parent — but the parent gets nothing from the child.

```javascript
const oldcar = new Car("OD", "white")
oldcar.showCharging() // ❌ TypeError — showCharging only exists on ElectricCar
```

## 5. `instanceof`

Checks if a class's prototype appears anywhere in an object's prototype chain.

```javascript
bmw instanceof Car // true, because EelectricCar extends Car
```

## 6. Method Overriding

A child class can redefine a method with the same name — this replaces the parent's version for that child's instances.

```javascript
class Animal {
    speak(){ console.log("Animal makes a sound") }
}
class Dog extends Animal {
    speak(){
        super.speak()           // call parent's version too
        console.log("Dog barks") // then add child's own behavior
    }
}
```

Output:
```
Animal makes a sound
Dog barks
```

## 7. Prototype & Prototype Chain

- **Prototype**: a live link from one object to another, used to look up properties/methods not found directly on the object. Not a copy — if the prototype changes later, linked objects see the change instantly.
- **Prototype chain**: the path JS follows — object → its prototype → that prototype's prototype → ... → `Object.prototype` → `null`.
- **Prototype inheritance**: the concept that objects can borrow behavior from other objects via this link, instead of copying it. Achieved *through* the prototype chain.

```javascript
const animal = { speak(){ console.log("sound") } }
const dog = Object.create(animal) // dog's prototype = animal, dog itself is empty
dog.speak() // "sound" — found via the chain
```

`class`/`extends` are syntactic sugar over this same mechanism — `Dog.prototype`'s prototype is set to `Animal.prototype` automatically.

### Lookup order example
```javascript
d.speak()
```
1. Does `d` itself have `speak`? No
2. Does `Dog.prototype` have `speak`? Check here first
3. Does `Animal.prototype` have `speak`? Found here (if not on Dog)
4. `Object.prototype`? checked next
5. `null` → chain ends → `TypeError` if never found

## 8. Polymorphism

**"Many forms"** — the same method call (`a.speak()`) behaves differently depending on the object's actual class, because each object's prototype chain resolves to a different method first.

```javascript
class Cat extends Animal { speak(){ console.log("Cat sound") } }
class Bird extends Animal {} // no override — falls back to Animal's speak()

const animals = [new Cat(), new Dog(), new Bird()]
animals.forEach(a => a.speak())
// Cat sound
// Dog sound
// Animal makes a sound   <-- Bird has no override, so chain climbs to Animal
```

Polymorphism is not a separate mechanism — it's a **result** of the prototype chain: different chains, different first match, different output for the same call.

## 9. Object Literals vs Classes — Why you can't make multiple instances of `{}`

```javascript
const animal = { name: "Generic" }
new animal() // ❌ TypeError: animal is not a constructor
```

An object literal `{}` is a single, already-built object — not a blueprint. Classes (or constructor functions) exist specifically to act as **factories** for creating multiple independent instances via `new`.

```javascript
class Animal {
    constructor(name){ this.name = name }
}
const a1 = new Animal("Rex")
const a2 = new Animal("Max")
a1 === a2 // false — separate instances, same prototype
```

## 10. Common Interview Questions

1. **Difference between `super()` and `super.method()`?** — Constructor call vs specific method call (see section 2).
2. **What happens without `super()` in a derived constructor?** — `ReferenceError`.
3. **What is method overriding?** — Child redefines a parent's method; child's version wins.
4. **What is polymorphism?** — Same method call, different behavior depending on actual object type.
5. **Inheritance vs polymorphism?** — Inheritance = structure (getting properties/methods). Polymorphism = behavior (same call, different results).
6. **How does `instanceof` work?** — Checks if a prototype exists in the object's chain.
7. **Can a subclass access parent's private (`#`) fields?** — No, `#fields` are not accessible outside the defining class, even by subclasses.
8. **Classical vs prototype-based inheritance?** — JS classes are sugar over prototype links; objects inherit from other objects directly, not "class blueprints" in the traditional sense.
9. **Can you override but still call original logic?** — Yes, via `super.methodName()` inside the override.
10. **What is method resolution order in JS?** — JS walks up the prototype chain and uses the **first match** found.

---

### Quick mental models to remember
- `super()` → **relay pass** of constructor params, one level at a time.
- Prototype chain → **asking up a chain of people** until someone knows the answer, or you reach `null` ("nobody left to ask").
- Polymorphism → **same question, different answer**, because each object's chain leads somewhere different.