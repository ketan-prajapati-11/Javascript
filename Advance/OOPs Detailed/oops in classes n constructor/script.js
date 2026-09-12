// creating class 
class Car{
    constructor(name,color,mileage){
        this.name = name;
        this.color= color;
        this.mileage = mileage
    }
    start(){
        console.log(`${this.name} starting ...`)
    }
    stop(){
        console.log(`${this.name} stopping ...`)
    }
}
// creating new object using the instance by new keyword
let bmw =  new Car("BMw","Dark Black",30)
let mg =  new Car("MG","Blue ",50)
let toyota =  new Car("Toyota","red",11)
// by using the class we can create a blueprint of the objects and we can create a constructor and method which will be pre existed on the class when we are creating new instance
console.log(bmw)
bmw.start()
mg.stop()