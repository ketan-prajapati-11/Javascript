// console.log(this)

// function abcd(){
//     // console.log(this)
// }
// abcd()

let userData = {
    user:"ketan",
    age:21,
    data : function(){
        console.log(this)
    }
}
// console.log(userData)
// console.log(userData.data())

document.querySelector('h1').addEventListener("click",function(){
    this.style.backgroundColor='blue'
    console.log(this)
})

// call apply blind
//using call we can pass the object value on that fuction

let obj={
    nam:"ketan",
    age:24
}
function dataset(){
    console.log(this)
}
// dataset.call(obj)
// console.log(dataset.call(obj))

function abc(a,b,c){
    console.log(this,a,b,c)
}
// abc.call(obj,1,2,3)

//apply
// in that .apply(this object we have to parse,[another value in array])
// working same as the call but parsing only2values

// abc.apply(obj,[1,2,5])

// bind
// bind is usefull when we have to create the fuction using the olderfuction where we have to pass the object and the argument . which is saved on that new fuction default like cloning the fuction

let newFun = abc.bind(obj,1,22,3)
newFun();