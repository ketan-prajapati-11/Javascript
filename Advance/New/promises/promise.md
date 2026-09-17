# JavaScript Callbacks & Promises — Complete Guide

A structured reference covering callbacks, promises, a full working example, and interview questions with answers.

---

## Table of Contents

1. [Callbacks](#1-callbacks)
2. [Promises](#2-promises)
3. [Full Working Example (Callback vs Promise)](#3-full-working-example-callback-vs-promise)
4. [Quick Comparison Table](#4-quick-comparison-table)
5. [Interview Questions & Answers](#5-interview-questions--answers)

---

## 1. Callbacks

### What is a callback?

A **callback** is a function passed into another function as an argument, to be executed later — usually after some task (sync or async) completes.

```javascript
function greet(name, callback) {
  console.log("Hi " + name);
  callback();
}

greet("Alex", function () {
  console.log("Callback finished!");
});
```

**Output:**
```
Hi Alex
Callback finished!
```

### Why callbacks matter: async operations

JavaScript is single-threaded. For slow operations (timers, file reads, network calls), it doesn't freeze and wait — it schedules a callback to run **later**, once the operation finishes.

```javascript
console.log("Start");

setTimeout(function () {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");
```

**Output:**
```
Start
End
This runs after 2 seconds
```

### Error-first callbacks (Node.js convention)

The first parameter is reserved for an error (or `null` if none):

```javascript
function readFile(path, callback) {
  const error = null;
  const data = "file contents";
  callback(error, data);
}

readFile("notes.txt", function (err, data) {
  if (err) {
    console.error("Something went wrong:", err);
  } else {
    console.log("Data:", data);
  }
});
```

### The downside: "Callback Hell"

```javascript
getUser(1, function (user) {
  getPosts(user.id, function (posts) {
    getComments(posts[0].id, function (comments) {
      console.log(comments);
      // keeps nesting...
    });
  });
});
```

Problems:
- **Pyramid of doom** — deeply nested, hard to read
- **Scattered error handling** — must check errors at every level
- **Hard to compose** — parallel execution or "wait for all" is clunky
- **Inversion of control** — you trust someone else's function to call yours correctly (once, with right args)

This is exactly why **Promises** were introduced.

---

## 2. Promises

### What is a Promise?

A **Promise** is an object representing a value that isn't available yet, but will be — eventually — either successfully (**resolved**) or with an error (**rejected**).

### The three states

| State | Meaning |
|---|---|
| **Pending** | Still working, no result yet |
| **Fulfilled** | Succeeded, has a value |
| **Rejected** | Failed, has a reason (error) |

Once **settled** (fulfilled or rejected), a promise **cannot change state again** — this guarantee is something plain callbacks don't give you.

### Creating a promise

```javascript
const promise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("Data loaded!");
    } else {
      reject("Something went wrong");
    }
  }, 1000);
});
```

### Consuming a promise

```javascript
promise
  .then((result) => {
    console.log(result); // runs on success
  })
  .catch((error) => {
    console.error(error); // runs on failure
  })
  .finally(() => {
    console.log("Done, either way"); // always runs
  });
```

### Chaining — the big win over callbacks

Every `.then()` returns a **new promise**, so chains stay flat instead of nesting:

```javascript
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "Priya" }), 500);
  });
}

function getPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["post1", "post2"]), 500);
  });
}

getUser(1)
  .then((user) => getPosts(user.id))
  .then((posts) => console.log(posts))
  .catch((err) => console.error(err));
```

One `.catch()` at the end handles errors from **any** step in the chain.

### Promise combinators (parallel execution)

```javascript
Promise.all([getUser(1), getUser(2), getUser(3)])
  .then((users) => console.log(users))
  .catch((err) => console.error(err));
```

| Method | Behavior |
|---|---|
| `Promise.all()` | Waits for all; rejects immediately if any one rejects |
| `Promise.allSettled()` | Waits for all; never short-circuits, returns each result/error |
| `Promise.race()` | Settles as soon as the *first* promise settles (success or failure) |
| `Promise.any()` | Resolves on the *first success*; rejects only if all fail |

```javascript
Promise.allSettled([getUser(1), getUser(99)]).then((results) => {
  results.forEach((r) => console.log(r.status)); // "fulfilled" or "rejected"
});
```

### Pros

- No pyramid nesting — flat, readable chains
- Centralized error handling with one `.catch()`
- Composable — easy to run tasks in parallel or in sequence
- Guaranteed single settlement (no accidental double-calls)
- Foundation for `async/await`

### Cons / gotchas

- Requires chaining discipline; sloppy code can still be a mess
- **Forgetting `return` inside `.then()` breaks the chain**:
  ```javascript
  getUser(1).then((user) => {
    getPosts(user.id); // ❌ missing return
  }).then((posts) => {
    console.log(posts); // undefined — ran too early
  });
  ```
- Unhandled rejections are easy to miss without a `.catch()`
- Slight overhead vs. a trivial one-off callback
- No native way to cancel a promise once started

---

## 3. Full Working Example (Callback vs Promise)

The same task — "fetch a user, then fetch their posts" — implemented both ways so you can see the transformation directly.

```javascript
/* ============================
   VERSION 1: Callback Style
   ============================ */

function getUserCB(id, callback) {
  setTimeout(() => {
    if (id <= 0) {
      callback(new Error("Invalid user id"), null);
      return;
    }
    callback(null, { id, name: "Priya" });
  }, 500);
}

function getPostsCB(userId, callback) {
  setTimeout(() => {
    callback(null, [`Post A by user ${userId}`, `Post B by user ${userId}`]);
  }, 500);
}

// Usage — nested callbacks
getUserCB(1, (err, user) => {
  if (err) {
    console.error("CB Error:", err.message);
    return;
  }
  console.log("CB: Got user:", user.name);

  getPostsCB(user.id, (err, posts) => {
    if (err) {
      console.error("CB Error:", err.message);
      return;
    }
    console.log("CB: Got posts:", posts);
  });
});


/* ============================
   VERSION 2: Promise Style
   ============================ */

function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("Invalid user id"));
        return;
      }
      resolve({ id, name: "Priya" });
    }, 500);
  });
}

function getPostsPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`Post A by user ${userId}`, `Post B by user ${userId}`]);
    }, 500);
  });
}

// Usage — flat chain
getUserPromise(1)
  .then((user) => {
    console.log("Promise: Got user:", user.name);
    return getPostsPromise(user.id);
  })
  .then((posts) => {
    console.log("Promise: Got posts:", posts);
  })
  .catch((err) => {
    console.error("Promise Error:", err.message);
  });
```

**Expected output (from either version):**
```
Got user: Priya
Got posts: [ 'Post A by user 1', 'Post B by user 1' ]
```

**What to notice:**
- The callback version nests one level deeper per async step; the promise version stays flat no matter how many steps are chained.
- The callback version needs an `if (err)` check at *every* level; the promise version needs just **one** `.catch()` at the end.
- Both versions do the exact same work — promises don't change *what* happens, only *how cleanly* you express it.

---

## 4. Quick Comparison Table

| Aspect | Callback | Promise |
|---|---|---|
| Nesting | Gets deep fast (pyramid of doom) | Stays flat via chaining |
| Error handling | Manual, repeated at every level | Centralized with one `.catch()` |
| Running tasks in parallel | Awkward, manual counting | Built-in: `Promise.all()`, etc. |
| Reusability | Hard to pass around | Easy — a promise is a value |
| Guarantees | None (could be called 0, 1, or many times) | Settles exactly once |
| Readability at scale | Poor | Good |
| Successor | — | `async/await` (built on promises) |

---

## 5. Interview Questions & Answers

### Q1. What is a callback function?
**A:** A function passed as an argument to another function, which is invoked ("called back") after the outer function completes its task — synchronously or asynchronously. Callbacks are the foundation of async programming in JavaScript before promises existed.

### Q2. What is "callback hell" and why does it happen?
**A:** Callback hell is the deeply nested, pyramid-shaped code that results from chaining multiple dependent async operations using nested callbacks. It happens because each async step needs the previous step's result, so each new callback gets nested one level deeper, hurting readability, error handling, and maintainability.

### Q3. What is a Promise in JavaScript?
**A:** An object representing the eventual completion (or failure) of an asynchronous operation. It has three states — pending, fulfilled, rejected — and once settled, its state and value are immutable. It provides `.then()`, `.catch()`, and `.finally()` to consume the result.

### Q4. What are the three states of a Promise, and can a promise change state after settling?
**A:** Pending, Fulfilled, and Rejected. Once a promise moves from pending to either fulfilled or rejected, it is permanently settled — it cannot transition to another state or resolve/reject a second time.

### Q5. How do Promises solve callback hell?
**A:** By allowing `.then()` calls to be chained instead of nested, since every `.then()` returns a new promise. This keeps async code flat and linear rather than pyramid-shaped, and lets you use a single `.catch()` to handle errors from anywhere in the chain instead of checking for errors at every level.

### Q6. What's the difference between `Promise.all()` and `Promise.allSettled()`?
**A:** `Promise.all()` resolves when *all* promises succeed, but rejects immediately if *any one* rejects (fail-fast). `Promise.allSettled()` always waits for every promise to settle, regardless of outcome, and returns an array of `{status, value}` or `{status, reason}` objects for each — useful when you need every result even if some fail.

### Q7. What's the difference between `Promise.race()` and `Promise.any()`?
**A:** `Promise.race()` settles (fulfilled or rejected) as soon as the *first* promise settles, whatever the outcome. `Promise.any()` resolves as soon as the *first promise fulfills*, ignoring rejections — it only rejects if *every* promise rejects.

### Q8. What happens if you forget to `return` a promise inside a `.then()`?
**A:** The chain breaks. The next `.then()` in the chain executes immediately without waiting for the inner async operation to finish, and the value passed forward will be `undefined` instead of the expected resolved value. Always explicitly `return` a promise you want the chain to wait on.

### Q9. What is an "unhandled promise rejection"?
**A:** It occurs when a promise is rejected but there's no `.catch()` (or second argument to `.then()`) to handle the error. In Node.js and browsers, this typically logs a warning/error to the console and can crash a Node process in newer versions. Always attach error handling to promise chains.

### Q10. How do callbacks and promises relate to `async/await`?
**A:** `async/await` is syntactic sugar built entirely on top of promises. An `async` function always returns a promise, and `await` pauses execution inside that function until the awaited promise settles — internally it's still using `.then()`/`.catch()` mechanics, just written to look synchronous.

### Q11. Can you convert a callback-based function into a promise-based one?
**A:** Yes — this is called "promisifying." You wrap the callback-based function inside `new Promise((resolve, reject) => {...})`, and call `resolve()` on success or `reject()` on error inside the original callback:
```javascript
function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
}
```

### Q12. Are promises synchronous or asynchronous?
**A:** The executor function passed to `new Promise()` runs **synchronously and immediately**. However, `.then()`/`.catch()` callbacks are always queued as **microtasks** and run asynchronously — even if the promise is already resolved — after the current synchronous code finishes executing, but before the next macrotask (like `setTimeout`).

### Q13. What's the main disadvantage of promises compared to callbacks?
**A:** Slightly more overhead/boilerplate for trivial one-off async operations, and no native built-in cancellation — once a promise's executor starts running, you can't natively stop it (you'd need external patterns like `AbortController` for that).

---

*Happy learning! Next natural step: `async/await`, since it builds directly on everything above.*