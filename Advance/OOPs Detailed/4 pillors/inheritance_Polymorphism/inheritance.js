class Car{
    constructor(brand,color){
        this.brand = brand;
        this.color=color;
    }
    start(){
        console.log(`${this.brand} is starting...`)
    }
    stop(){
        console.log(`${this.brand} is stopping...`)
    }
}
class EelectricCar extends Car{ // using the extends we can use the parent class or properties and methods on it.
    constructor(brand,color,charging){ // first we have to create the constructor of that current class then we can use tha parent class constructor by using the super keyword then we have to define the new properties of the child class
        super(brand,color)
        this.charging=charging
    }
    showCharging(charging){
        console.log(`${this.charging} is current charging`)
    }
}

const oldcar = new Car("OD","white")
oldcar.start()
oldcar.stop()
// oldcar.showCharging()

const bmw = new EelectricCar("bmw","black",22)
bmw.start()
bmw.stop()
bmw.showCharging()
console.log(bmw instanceof Car)

class BMW1 extends EelectricCar{
    constructor(brand,color,charging,model){
        super(brand,color,charging)
        this.model = model
    }
    showModel(){
        console.log(`curr model: ${this.model}`)
    }

}
const gt1 = new BMW1("BMW","Black",22,"GT1")
gt1.showModel()


// polymorphism

class Animal{
    constructor(name){
        this.name= name
    }
    speak(){
        console.log("animal can speak")
    }
}
class Dog extends Animal{
    speak(){
        console.log("barking...")
    }
}
class Cat extends Animal{
    speak(){
        console.log("Meoww...")
    }
}
class Bird extends Animal{
  
}

const puppy = new Dog("puppy")
console.log(puppy.name)
puppy.speak()

const animals = [new Dog(), new Cat(), new Bird()]

animals.forEach(a => a.speak())