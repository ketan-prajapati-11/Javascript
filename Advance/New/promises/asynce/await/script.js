const cart = [1, 2, 3];

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise is resolved");
  }, 4000);
});
// function newcart(data) {
//   p.then((res) => {
//     console.log(res);
//   });
//   // in the Js engine now wait for the above excution it works next  thats why this below is priniting first then 4 second above one is resolved and printing

//   console.log("im after the resolve");
// }
// newcart(cart);

async function newAsyncCart(cart) {
    let val = await p // await is written aside of the promise
    console.log(val)
    console.log("im after the await")
    
}
// newAsyncCart()
let date = new Date()

const promise1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve("i am resolved promise1")
    }, 2000);
})
const promise2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
    resolve("i am resolved promise/2")
    },4000);
})

async function handlePromise() {
    console.log("Starting Promises...")
    const val1 = await promise1
    console.log("here is promise 1")
    console.log(val1)
    console.log(date.toLocaleTimeString())
    console.log(date.toTimeString())
    console.log(date.toISOString())
    
    const val2 = await promise2
    
    console.log("here is promise 2")
    console.log(val2)
    console.log(date.toLocaleTimeString())

}
// handlePromise();

// -- fetch api 
// we can do error handling while doin try catch on async await

const USER_API = "https://api.github.com/users/ketan-prajapati-11"

async function handleApi() {

try {
        const userApi= await fetch(USER_API)
    console.log(userApi)
    const jsonValue = await userApi.json()
    console.log(jsonValue)
    console.log(jsonValue.type)
} catch (error) {
    console.log(error)
}
finally{
    console.log("async fuction is worked here")
}

    
}
handleApi()

// async function handleApi() {

//     const userApi= await fetch(USER_API)
//     console.log(userApi)
//     const jsonValue = await userApi.json()
//     console.log(jsonValue)
//     console.log(jsonValue.type)
// //     const reader = userApi.body.getReader()
// // while (true) {
// //   const { done, value } = await reader.read()
// //   if (done) break
// //   console.log("Got a chunk:", value) // Uint8Array of bytes
// // }
    
// }
// handleApi().catch(err => console.log(err))


