let arr = [2,4,5,6,7,3]

//=======map======

let b = arr.map(e => e*2)
console.log(b)

function multi3(x){
    return x*3
}
// in map when passing a fuction then dont we have to write parameters and perenthisis
let m3 = arr.map(multi3) // 
console.log(m3)
console.log("m4 --------")
// below will gives the error because we are just giving that fuction refernect to map. then map will go to that reference then put that array curr value on it and get that return on the new array
// let m4 = arr.map(multi3())
// console.log(m4)

console.log("----filter----")
//---- filter-----
let newArr =arr.filter(e => e>4)
console.log(newArr)
function moldulo3(x){
    if(x%3==0)
        return x
}
let module3 = arr.filter(moldulo3)
console.log(module3)
console.log("--reduce--")
//--- reduce----
let output = arr.reduce((acc,val)=>acc+val,0)
console.log(output)
let maxi = arr.reduce((acc,val)=>{
    if(acc<val){
        acc = val
    }
    return acc
},0)
console.log("--max-")
console.log(maxi)

let users = [
    {firstname:"Ketan",lastname:"prajapati",age:24},
    {firstname:"Rohan",lastname:"Patel",age:25},
    {firstname:"Mayur",lastname:"Mistry",age:28}, 
    {firstname:"raj",lastname:"jine",age:34}, 
    {firstname:"mitr",lastname:"sharma",age:40}, 
    {firstname:"chirag",lastname:"gopal",age:30}
]

console.log("--- accu--- reduce ----")
let fullname = users.map(e => e.firstname+" "+e.lastname)
console.log(fullname)
let ageData = users.reduce(function(acc,curr){
    if(acc[curr.age]){
        ++acc[curr.age]
    }
    else{
        acc[curr.age] =1
    }
    return acc
},{})
console.log(ageData)
let age= users.filter(e=> e.age < 30).map(e=>e.firstname)
console.log(age)

console.log("---reduc----")
let age1 =users.reduce(function(acc,curr){
    if(curr.age<30){
      acc.push(curr.firstname)
    }
    return acc
},[])
console.log(age1)

const userData = async function () {
     let response = await fetch("https://randomuser.me/api/")
     let data = await response.json()
     console.log(data)
    
}

async function getData() {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
getData()