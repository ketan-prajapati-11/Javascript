// "use strict"
// console.log(this)
// console.log(this)
function me(){
    console.log(this)
}
me()
// using the strict mode  that value will be undefiend 
//if we are not using the strict mode then  because of the  s has something known this substitution that convert the undefined into the gloabl object in the browser the global object is this
window.me() // give the window object because we are refering to this to that window
let st1 ={
    name:"Ketan",
    printName: function(){
        console.log(this.name)
    }
}
st1.printName()
// When a function is part of an object, this refers to the object itself 

//======= call apply bind methods (sharing methods) usefull for the sharing he method from object to another object using the call apply bind

let st2 = {
    name:"rahul"
}
st1.printName.call(st2) //just sharing the method but not changing the original object
console.log(st2)
// =====================================

console.log("----- arrow -----")
let data =()=>{
    console.log(this)
}
data()

console.log("arro---")
let obj1 ={
    brand:"BMW",
    model: () =>{
        console.log(this.brand)
    }
}
obj1.model()
console.log(obj1.model())
// Arrow functions don't have their own this; they lexically inherit this from their surrounding scope.

let obj12 ={
    brand:"BMW",
    model: function(){
        let print= () =>{
        console.log(this.brand)
    }
    print()
    }
}
obj12.model()
// We generally should NOT use an arrow function as an object method when we need this to refer to that object.

// But arrow functions are useful inside objects when we don't need the object's this.

console.log("here is meow====")
let meo ={
    name:"ketan",
    printing:function(){
        console.log(this.name)
        setTimeout(() => {
            console.log(`${this.name} my name`)
            
        }, 2000);
    }
}
console.log(meo.printing())

// === this inside dom elements it return that element
// while defining the event listener we have to also pass the second paramater as a fuction for it will call later if we write something differnt then the fuction than it will execute like the alert button .
let btn = document.querySelector('button')
btn.addEventListener('click',function(){
    alert(this.tagName)
})
// btn.addEventListener('click', alert(this)
// )
