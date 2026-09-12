# Java OOP: Classes, Constructors & Methods

Quick reference notes for interviews and revision.

---

## 1. Class

A **class** is a blueprint/template for creating objects. It defines the **fields (data)** and **methods (behavior)** that objects of that type will have. A class itself is not an object — it doesn't take up memory for data until you create an instance (`object`) of it.

```java
class Car {
    String brand;   // field
    int speed;      // field
}
```

**Key points for interviews:**
- Declared using the `class` keyword.
- Object = instance of a class, created using `new`.
- A class can contain: fields, constructors, methods, blocks, nested classes.

---

## 2. Constructor

A **constructor** is a special block of code used to **initialize an object** when it is created.

**Rules:**
- Must have the **same name** as the class.
- Has **no return type** — not even `void`.
- Called **automatically** when an object is created with `new`.
- Can be **overloaded** (multiple constructors with different parameters).
- If you don't write any constructor, Java provides a **default constructor** automatically.

### Types of Constructors

| Type | Description | Example |
|---|---|---|
| Default Constructor | No parameters, provided by Java if none is defined | `Car() { }` |
| Parameterized Constructor | Takes arguments to set initial values | `Car(String brand) { }` |
| Copy Constructor | Not built-in in Java (unlike C++), but can be created manually | `Car(Car c) { this.brand = c.brand; }` |

```java
class Car {
    String brand;
    int speed;

    // Parameterized constructor
    Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
        System.out.println(brand + " car created!");
    }
}
```

> **Interview Tip:** "Why no return type for constructor?" — Because a constructor's job is to initialize the object itself, not to return a value. The object reference is returned implicitly by `new`.

---

## 3. Method

A **method** is a block of code inside a class that defines a **behavior or action**. Unlike constructors, methods:
- Have a **return type** (or `void`).
- Are called **explicitly**, whenever needed (not automatically).
- Can be called **multiple times**.
- Can be **overloaded** and **overridden**.

```java
class Car {
    void drive() {
        System.out.println("Car is driving");
    }

    int getSpeed() {
        return 100;
    }
}
```

---

## 4. Constructor vs Method — Comparison Table

| Feature | Constructor | Method |
|---|---|---|
| Name | Same as class name | Any valid identifier |
| Return type | None (not even `void`) | Must have a return type or `void` |
| Invocation | Automatically, on object creation (`new`) | Manually, called using object reference |
| Purpose | Initialize object's state | Define object's behavior/logic |
| Inheritance | Not inherited | Inherited by subclasses |
| Overloading | Allowed | Allowed |
| Overriding | Not applicable | Allowed (runtime polymorphism) |

---

## 5. Full Working Example

```java
class Car {
    // Fields
    String brand;
    int speed;

    // Constructor — runs automatically on object creation
    Car(String brand, int speed) {
        this.brand = brand;
        this.speed = speed;
        System.out.println(brand + " car created!");
    }

    // Methods — called manually
    void drive() {
        System.out.println(brand + " is driving at " + speed + " km/h");
    }

    void honk() {
        System.out.println(brand + " says: Beep Beep!");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car1 = new Car("Tesla", 120);   // constructor runs here
        Car car2 = new Car("Honda", 90);

        car1.drive();   // method call
        car1.honk();
        car2.drive();
    }
}
```

**Output:**
```
Tesla car created!
Honda car created!
Tesla is driving at 120 km/h
Tesla says: Beep Beep!
Honda is driving at 90 km/h
```

---

## 6. Real-World Analogy

| Concept | Analogy |
|---|---|
| Class | Car design/blueprint |
| Object | An actual car built from the blueprint |
| Constructor | The factory assembly step that sets up the car with initial specs |
| Method | Actions the car can perform (drive, honk, brake) |

---

## 7. Common Interview Questions

1. **Can a class have multiple constructors?**
   Yes, this is called **constructor overloading**.

2. **Can we call a constructor explicitly like a method?**
   Not directly with an object reference, but you can call another constructor from within a constructor using `this()`, or a parent constructor using `super()`.

3. **What is the difference between constructor overloading and method overloading?**
   Both mean having multiple versions with different parameter lists — the difference is just that one applies to constructors and the other to regular methods.

4. **Is a constructor inherited?**
   No. Constructors are not inherited by subclasses, but a subclass constructor can call the parent's constructor using `super()`.

5. **What happens if you don't define any constructor?**
   Java automatically provides a no-argument **default constructor**.

6. **Can a constructor be private?**
   Yes — commonly used in the **Singleton design pattern** to restrict object creation from outside the class.

7. **Can methods be static, but constructors can't?**
   Correct. Constructors can never be `static` because they operate on the instance being created; static methods belong to the class, not an instance.

---

## 8. Topics to Study Next
- Constructor overloading vs Method overloading
- `this` vs `super` keyword
- Static vs Instance methods
- Constructor chaining
- Access modifiers on constructors (Singleton pattern)