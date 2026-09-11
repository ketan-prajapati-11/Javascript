In this video, *Akshay Saini* demonstrates several scenarios to explain the behavior of the `this` keyword. Here are the key code examples used throughout the tutorial:

### 1. Global Space
In the global space, `this` refers to the global object (e.g., `window` in browsers).
javascript
console.log(this); // window object


### 2. Inside a Function
The value depends on the execution mode (3:45 - 8:22):
* **Non-strict mode:** `this` defaults to the `window` object due to "this substitution."
* **Strict mode:** `this` is `undefined`.

### 3. Object Methods
When a function is part of an object, `this` refers to the object itself (17:10 - 19:55).
javascript
const obj = {
  a: 10,
  x: function() {
    console.log(this); // refers to 'obj'
  }
};
obj.x();


### 4. Explicit Binding (call, apply, bind)
You can manually set the value of `this` to share methods between objects (24:21).
javascript
const student = { name: "Akshay", printName: function() { console.log(this.name); } };
const student2 = { name: "Deepika" };

// Sharing the method using .call()
student.printName.call(student2); // Output: Deepika


### 5. Arrow Functions
Arrow functions do not have their own `this`; they inherit the `this` of the **enclosing lexical context** (28:03 - 35:06).
javascript
const obj = {
  a: 10,
  x: () => {
    console.log(this); // Lexical context (window)
  }
};


### 6. DOM Elements
When used in a DOM event handler, `this` refers to the HTML element that triggered the event (42:08 - 44:48).
javascript

