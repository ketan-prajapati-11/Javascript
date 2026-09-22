const p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject("p1 is rejected")
        // resolve("p1 is resolved")
    }, 3000);
})
const p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        // resolve("p2 is resolved")
        reject("p2 is rejected")
    }, 1000);
})
const p3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject("p3 is rejected")
        // resolve("p3 is resolved")
    }, 4000);
})
const p4= new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve("p3 is resolved")
    }, 2000);
})


// #1-------
// promise. all in all promises are executing together if all promises are resolved then it resturn the arry of resolved that promise after the maximun time taken promise
//if anyone fails first then that promise. all imediatly return the error and dont wait for another promises to resolve or reject
// by using this promise all we can get a first failed promise if it is reject
// Promise.all([p1,p2,p3])
// .then(res=> console.log(res))
// .catch(err => console.error(err))

// it return the resolve and rejected values

//2======
// promise. allsettled
// it wait for all promises to settle then give the return in object array

// Promise.allSettled([p1,p2,p3])
// .then(res=> console.log(res))
// .catch(err=> console.error(err))

// it returns the status and value/reson which is the resolve n rejected value in that array object

//3=======
//promise. race
// in the promise . race it gives the frist setteld promise return its value which is fullfilled or not . means resolved or rejected.
// it is only gives the fastest first setteled  promises and gives it rejected or resolved values
// Promise.race([p1,p2,p3])
// .then(res=>console.log(res))
// .catch(err=> console.error(err))

//4====
//promise.any
// it gives the first settle promises which gives the fullfilled promise or sucess in return
//if all promises settled are not fullfilled then it gives the aggrigration error means the final error in all the promises are rejected
// it returns the erros in array form
Promise.any([p1,p2,p3])
.then(res => console.log(res))
.catch(err=>{
    console.error(err)
    console.log(err.errors)
})

