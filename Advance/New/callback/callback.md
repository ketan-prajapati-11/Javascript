Here are clean, standalone explanations for both:

## 1. Callback Hell

**Definition:** Callback hell is a situation in JavaScript where multiple asynchronous operations are nested inside one another's callback functions, causing the code to grow horizontally (to the right) instead of vertically (downward). This deeply nested structure resembles a pyramid, which is why it's also called the "Pyramid of Doom."

**Explanation:** It typically happens when one async task depends on the result of a previous one — like fetching a user, then their posts, then comments on those posts. Each step needs a callback, and each callback is written inside the previous one:

```js
getUser(id, (user) => {
  getPosts(user, (posts) => {
    getComments(posts, (comments) => {
      renderPage(comments, () => {
        console.log("Done!");
      });
    });
  });
});
```

This makes the code:
- Hard to read and follow
- Difficult to debug
- Hard to handle errors consistently at each level
- Difficult to maintain or modify later

**Solution:** Promises and `async/await` were introduced to flatten this structure and make asynchronous code look and behave more like synchronous code.

## 2. Inversion of Control

**Definition:** Inversion of Control (in the context of callbacks) refers to the loss of control over your own function's execution when you pass it as a callback to another function (especially a third-party library or API). Instead of your code deciding when and how your function runs, that responsibility is handed over to the outer function.

**Explanation:** When you write:

```js
doSomething(data, (err, result) => {
  // your logic here
});
```

You're trusting `doSomething` to:
- Call your callback **at the right time**
- Call it **exactly once** (not zero times, not multiple times)
- Call it **with the correct arguments**
- Handle errors properly before invoking it

Since you no longer control *when* or *how* your own function executes, you've essentially "inverted" the control of your program to someone else's code. If that outer function is buggy or behaves unexpectedly, your callback could run twice, receive bad data, or never run at all — and there's little you can do about it from inside your callback.

**Solution:** Promises solve this by giving you a contract — a promise is guaranteed to settle (resolve or reject) exactly once, restoring control and predictability to your code.