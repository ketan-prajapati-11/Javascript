// var a= 2
// // let b =2
// const c ="name"
// console.log(c)
// // const c=3;
// c = 1
// console.log(c)

// var is execible on its parent element everywhere... in globally if we create that var the it will gone to passes in js engine that time the all the file will be executed in the one fuction thats why var is exicible on where where.  it does not respect { } means { var a=10 then it will be like not fuction only the braces block where it is globlly excissible}
// if we write in fuction that only it will be visible or exicible on that fuction


// let is block score variable where in the braces block declairing and initializing  it is only avialble for that block. after it will not working.
// if in the block variable value if we are priting or doing something then it will find that variable value in that scope first if it will not find out then i will go to global element
// let a = 10;
// {
//     let a = 20;
//     console.log("inside",a)
// }
// console.log("outside", a)

// const person = {
//     name:"ketan"
// }
// person.name = "Prajapati"
// // person.name ={}
// // console.log(person.name)
// console.log(person)
// person = {}
// console.log(person)
let x = 10;
x = true;
// x = "Ketan";

console.log(x);
