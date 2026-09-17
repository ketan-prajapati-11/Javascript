let cart = ["jacket", "shoes", "shirt"];
const promise = createOrder(cart)
console.log(promise)
promise
.then(function(orderId){
    console.log(orderId)
    return orderId
})
.then(function(orderId){
    return paymentTransaction(orderId);
})
.then(function(paymentInfo){
    console.log(paymentInfo)
})
.catch(function(err){
    console.log(err.message)
})


function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const err = new Error("Invalid card iteam");
      reject(err);
    }
    const orderId = "12345";
    // if(orderId){

    //     resolve(orderId)
    // }
    setTimeout(() => {
          resolve(orderId);
    }, 2000);
  
  });

  return pr;
}
function validateCart(cart) {
  if (cart) {
    return true;
  }
}
function paymentTransaction(orderId){
    return new promise(function(resolve,reject){
        resolve("Payment Succesfull")
    })
}
