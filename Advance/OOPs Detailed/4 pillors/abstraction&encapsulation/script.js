// Abstraction in we are hiding the internal working of the fuction or computation only giving the complext things in only in one fuction which is easy to use but its internal working not showing how they are working .
// but in abstraction some of the properties we dont want to change but that changes some users can do . like fuelpercentage and more things... but we dont wanna that that is the one issue here thats why we are using abstraction with encapusation. in that encapsulaton helps to hide the particulat object or properties or method from the directly access to the user. usign the  get or set method we can do changes on it.

/*
class Car{
    constructor(brand,color,fuelPercetage =10){
        this.brand = brand;
        this.fuelPercetage=fuelPercetage;
        this.color = color
    }
    carDetails(){
        console.log(`${this.brand} color is ${this.color} fuelPercentage:${this.fuelPercetage}`)
    }
    fuelBurn(){
        this.fuelPercetage -= 1
    }
    start(){
        this.fuelBurn()
        this.carDetails()
    }
    
}
const bmw = new Car("BMW","black",100)
console.log(bmw)
console.log("bmw cardetails")
console.log(bmw.carDetails())
console.log("bmw starting....")
console.log(bmw.start())
bmw.fuelPercetage =100101
console.log(bmw.start())
*/

//  Encapsulation method

class Car{
    #fuelPercetage;
    constructor(brand,color,fuelPercetage =10){
        this.brand = brand;
        this.#fuelPercetage= fuelPercetage;
        this.color = color
    }
    #carDetails(){
        console.log(`${this.brand} color is ${this.color} fuelPercentage: ${this.#fuelPercetage}`)
    }
    #fuelBurn(){
        this.#fuelPercetage -= 1
        console.log(`fuel is ${this.#fuelPercetage}`)
    }
    start(){
        this.#fuelBurn()
        this.#carDetails()
    }
    set fuelPercetage(value){
        if (value<0 || value>100){
            console.log("write fuelpercentage between 0 to 100")
            return 0;
        }
    
       else{
         this.#fuelPercetage = value
        console.log(this.#fuelPercetage)
        console.log(this.#carDetails())
       }
    }
    get fuelPercetageshow(){
        console.log(`the getter method using seeing the fuelpercentage ${this.#fuelPercetage}`)
    }
}
const bmw = new Car("BMW","Dark Blue",50)
console.log(bmw)
console.log(bmw.start())
// bmw.#fuelPercetage = 100
console.log("---------------")
bmw.fuelPercetage =12;// set the value using the set method in encapsulation
bmw.fuelPercetageshow //that both one is not a fuction so we dont have to write the paranthisis on it
// console.log(bmw.start())
// console.log(bmw.setfuelPercetage(12))

// console.log("nw")
// console.log(bmw.start())


