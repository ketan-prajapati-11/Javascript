// map sirf tab use krna hai jab pichale array ke basis par new array banana ho like old array ke element ke upar operation krke

let arr= [1,3,4,56,33]
// let newArr = arr.map(function(val){
//     return val*2;
// })
// console.log(newArr)

//filter
//filter is used when we have to apply some condition to old arry and which condition comes true then it will be pushed on new array and new array size is may be differant of from another.
// console.log(arr)
// let newArr= arr.filter(function(val){
//     if(val>10) return true
// })
// console.log(newArr) 
arr = [1,2,3,4,5]
let sum = arr.reduce(function(accumulator,val){
    return accumulator+val
},0)
console.log(sum)

// arr find method in that it returns that value of the index array 1st one who satishfy the condition. 

// let array = [1,2,3,4,1,2]
// let newarray = array.find(function(val){
//     return val===2
// })
// console.log(newarray)

let ar = [
    {id:1,key:1},
    {id:2,key:2},
    {id:3,key:1},
]
let newar = ar.find(function(val){
    return val.key===1
})
console.log(newar)

//some --> is used for checking the particulare value is in that aray if yes whrere anyone of them passes that condiion then it give true return

let so = arr.some(function(val){
    return val>2
})
console.log(so)

// --> every where it checks the condition in that array if it is following that condition true then it returns the true value on it
console.log("every operation ")
let ev = arr.every(function(val){
    // return val>3
    return val>0
})
console.log(ev)

//exercise

let arg = [1,2,3,4]
 arg.splice(1,0,44,55)
 console.log(arg)

 // destructuring of array
 let name = ["ketan","prajapati"]
 let [firstname,lastname] = name
 console.log(firstname,lastname) 


 // adding element in array in first position using spread operator
 let country = ["us","uk"]
 country = ["in",...country]
 console.log(country )