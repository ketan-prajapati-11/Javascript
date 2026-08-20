const id1 = Symbol("id001")

let person ={
    name:"ketan",
    [id1] : 123
}
console.log( person)

console.log(Object.getOwnPropertySymbols(person));
