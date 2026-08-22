// creating excessing and modification array
let arr= [1,2,3,4]
// console.log(arr[2])
// arr[2] = 221
// console.log(arr[2])
console.log(arr)
arr.push(11)
console.log(arr)
arr.pop()
console.log(arr)
arr.shift()
console.log(arr)
arr.unshift(111)
console.log(arr)
console.log("splice method")
arr.splice(1,2)
console.log(arr)
arr.push(11,22,33,44)
console.log(arr)

 arr.slice(0,3)
console.log(arr)
console.log("slice method")
let newArr = arr.slice(0,3)
console.log(newArr)
arr.reverse()
console.log(arr)
arr.sort()
console.log(arr)
newArr =arr.sort()
console.log(newArr)

console.log("sorting proper method")
let rs = arr.sort(function(a,b){
    return a-b;
})
console.log(rs)
console.log("our array")
arr.sort(function(a,b){
    return a-b;
})
console.log(arr)
