//  call() allows us to use a function with a different object without copying the function into that object.
// The call() method is used to borrow a function and execute it with a specified object as the value of this.
// call() is used to borrow a function, set its this to a specified object, and execute it immediately.
// apply() is same but when we using the arument that time we wirte the new argument in array .apply(object,[arg,arg2])
// bind() is used to create a new function with this permanently set to a specified object. The new function is not executed immediately; it can be called later.

let user1 ={
    name:"ketan",
    printName:function(){
        console.log(this.name)
    }
}
user1.printName()

// by using the call apply bind method we can borrow the fuction and we can use it on our object by using this
 // call
 user2 ={
    name:"rahul"
 }

 // now we are borrowing the user1 printe name fuction to user2
 //for that first we have to select that fuction here the fuction is user1.printName location exsists
 // it is like we are borrowing the mothod from one object to another object
 user1.printName.call(user2)

 // we can also create the fuction seperatly and use it

 person1 ={
    name:"kohli",
    age: 22
 }
 person2 ={
    name:"virat",
    age: 21
 }
 function printName(){
    console.log(`${this.name} is age is ${this.age}`)
 }
 // now calling that or borrowing that fuction in the to object
// that will be imediatly invoked
// fuctionname.call(object)
printName.call(person1)
printName.call(person2)

// we can pass multiple arguments on that fuction

let city1={
    name:"Anand",
    location:"Gujarat"
}
let city2={
    name:"mubai",
    location:"mahrastra"
}
function cityData(city,food,femous){
    console.log(`${this.name} city ${this.location} has famous food ${food} femous place ${femous}`)
}
cityData.call(city1,"pannertika","Amul")
cityData.call(city2,"jalebi","Kalaghoda")

// apply method
// the object is same but we are here to create the fuction parameter in one is object and another is array
function cityView(food,femous){
    console.log(`${this.name} city ${this.location} has famous food ${food} in place ${femous}`)
}
let city3={
    name:"delhi",
    location:"lal kilaa"
}
cityView.apply(city3,["chana","Zoon"])
console.log("---")
 console.log("=======bind====")
//bind method
let city4={
    name:"kolkata",
    location:"talav"
}
let kolkata = cityView.bind(city4,"rasogula","bmvplace")
console.log(kolkata)
kolkata()

console.log("===== n ===")
 let a = {
    name:"ketu",
    neww:()=>{
        "use strict"
        console.log(this.message)
    }
 }
a.neww()
// 
console.log("new--------check-----")

//
function newE(num1,n2){
    console.log(this.name)
}
const object1 = {
    name:"ketan",
     newE
}

let obb =newE.bind(object1)
setTimeout(obb, 1000);
// setTimeout(() => {
//     object1.newE()
    
// }, 1000);
//
console.log(".......")
// setTimeout(
//     object1.newE()
    
// , 1000);
// console.log(" object1.newE 1 ")
// object1.newE
// console.log(" object1.newE() 2")
// object1.newE()

