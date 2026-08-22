// function add(a, b) {
//     // console.log(a + b);
//     return a+b;
// }

// let result = add(10, 20);
// console.log(result)

// when we dont know how many argument passes then we use rest parameter

// function add(...number){ // fuction declairation
//     console.log(number)
// }
// add(1,2,3,4)

// let addition = add that is called fuction expression

// function calculate(a,b,operation) {
//     return operation(a,b)
    
// }
// function add(a,b){
//     return a+b;
// }
// let answer = calculate(1,2,add)
// console.log(answer)

// function outer() {
//     function inner() {
//         console.log("Hello");
//     }

//     return inner;
// }
// // console.log(outer)
// // console.log(outer())

// let result = outer;
// console.log(result()())

// result();


// function test() {
//     let x = 10;

//     console.log(x);
// }

// test();

// console.log(x);




// let x = 10;

// function outer() {
//     let y = 20;

//     function inner() {
//         let z = 30;

//         console.log(x);
//         console.log(y);
//         console.log(z);
//     }

//     inner();
// }

// outer();

/// Rest operator

// function add(...a){
//     console.log(a)
// }
// add(1,2,3)

// function add(a,b,c, ...val){
//     console.log(a,b,c,val)
// }
// add(1,2,3,4,5)

//------------first class fuction

// function abc(val){
//     val()
// }
// abc(function(){
//     console.log("hiii")
// })  

// function ad(a,b,c){
//     console.log(a,b,c)
// }
// ad(1,2)

// guess score
// function add(...val){
//     let sum =0;
//     // for (const value of val) {
//     //    sum += value
        
//     // }
//     val.forEach(function(value){
//         sum += value
//     })
//     return sum;
// }
// console.log(add(1,2,3,4,5))

// passing fuction into another function

// function ad(val){
//     val();
// }
// ad(function(){
//     console.log("hii")
// })

// higher order function
// when any function return the function or taking argument function in parameter
// function addTotal(val) {    //--------- that one is called higher order fuction
    
// }
// addTotal(function(){

// })

// //or
// function adon(){ //======== adon is higher value
//     return function()
// }



/// what is clouser and why it is created ?
// when fuction ;s return is funcation and its child fuction is using its parent any varibale on it then it is called clouser
// function abcd(){
//     let a =2;
//     return function(){
//     console.log(a)
//     }
// }
// console.log(abcd()())

// IIFE  use 

let newFunc = (function(){
    let score = 0
    return {
        getScore: function(){
            console.log(score)
        },
        setscoe: function(val){
            score =val
        }
    }

})() 
console.log(newFunc)
console.log(newFunc.getScore())
newFunc.setscoe(22)
console.log(newFunc.getScore())