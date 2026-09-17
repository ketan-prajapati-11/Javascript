const cart = ["moblie","chargin cable","Adaptor"]

// Create order
createOrder(cart)
//Proceed to payment
.then(function(orderId){
    console.log("2. //Proceed to payment")
    console.log(`proceding to payment for OrderId: ${orderId}`)
    return proceedToPayment(orderId)
})
//Show order Summury
.then(function(cartWithAmout){
    console.log("3. //Show order Summury")
    console.log(cart)
    return orderSummury()
})

// update wallet
.then(function(wallet){
    console.log("4. // update wallet")
    return updatedWallet(wallet)
})
.then(function(wallet){
    console.log(`Updated Wallet is${wallet}`)
})
.catch(function(wallet){
    console.log(err.messsage)
})
function createOrder(cart){
    return new Promise(function(resolve,reject){
        
        if(validateCart(cart)){
            const orderId = "12314"
            resolve(orderId)
        }
        else{
            const err = new Error("Invalid cart")
            reject(err)
        }

    })
}
function proceedToPayment(orderId){
   return new Promise(function(resolve,reject){
     const wallet = 3000;
    const cartAmout = 400
    if(orderId && walletValidation(wallet,cartAmout)){
       
        resolve(wallet,cartAmout)
    }
    else{
        const err = new Error("Insuficient Wallet Money")
        reject(err)
    }
   })
    
}
function validateCart(cart){
    if(cart){
        return true
    }
    else {
        return false
    }
}
function walletValidation(wallet,cartAmout){
    return new Promise(function(resolve,reject){
            if(wallet<cartAmout){
        return false
    }
    else{
        return true
    }
    })
        
}
function orderSummury(){
    return new Promise(function(resolve,reject){
          let summury = {cartAmout:400,
                    wallet:3000
  }
    if(summury){
        resolve(summury)
    }
    else{
        const err= new Error("Error: Not found summury")
        reject(err)
    }
    })

}
function updatedWallet(wallet){
    return new Promise(function(resolve,reject){
        const newWallet =2600
       if(!newWallet){
        const err = new Error("wallet is not updated")
        reject(err)
       }
       else{
         resolve(newWallet)
       }
    })
}
