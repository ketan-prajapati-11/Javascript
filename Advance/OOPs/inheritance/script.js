let coffee = {
    namee:"coffeee",
    drink:function(){
        console.log("drinking coffee")
    }
}
let darkcoffee = Object.create(coffee)
darkcoffee.price = 11                                        
console.log(darkcoffee)