function discountCalculator(discount){
    return function(price){
        return price-(price*(discount/100))
    }
}
let discount10 = discountCalculator(10)
let discount20 = discountCalculator(20)
console.log(discount10(100))