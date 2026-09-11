// 4 way of creating object
//--------------------------------------------
//1. object literal
    // one time at a only one obect created . using that we cannt create another object or instance >> it is also called single tone object
// let student = {
//     name1:"Ketan", // <- that is called property where key and value is defiend 
//     printName: function(){  // <-that is method where fuction defiend in the object
//         console.log(`my name is ${this.name1}`)
//     }
// }
// student.printName()
//---------------------------------------------
//2. fectory fuction
    // by using one fuction we can create multiple objects while using that function
    // we have to return the object in that fuction because method will be created here only fuction writting in side another fuction not work . we have to write return in that all value and this keyword will work
    // by doing that  it Does not involve prototype it self ( we have to manually set prototypes on it) // like by default prototype not providing
// function personData(name,age,hobby){
//   return{
//       nameIs:name,
//     age,
//     hobby,
//     introself: function(){
//     console.log(`my name${this.nameIs} age is ${this.age} my hobby ${this.hobby}`)
//     }
//   }
// }
// let st1 =personData("rahul",11,"chess")
// console.log(st1)
// st1.introself()

// let st2 =personData("mahesh",122,"Football")
// st1.introself()

//----------------------------------------------
//3. constructor fuction
    // new creates a new object and sets that new object's internal [[Prototype]] to StudentsData.prototype.
        // JS roughly does // 1. Create a new empty object
                                //const newObject = {};

                            // 2. Connect it to StudentsData.prototype
                            //     Object.setPrototypeOf(newObject, StudentsData.prototype);

                                // 3. Call StudentsData with `this` = newObject
                               // StudentsData.call(newObject, "Raju", 44, "Jamnagar");

                            // 4. Return newObject


// function StudentsData(stName,age, city){
//  this.stName= stName, //we are assigning the value not like keyvalue pair. 
//  this.age= age, // this will help to bind the value to the new object means this.age means st7.age when we write this then it will bindig that to new object
//  this.city =city,
//  this.printStudent= function(){
//     console.log(` student ${this.stName} age ${this.age} and their city ${this.city}`)
    
//  }
//  return this // when we calling the contrustor without new keyword then we have to write return this. means all that object value will be binded to the window object. thats why we are getting this will be window in that name age city property because the new object is not created it is refering the value . this will going to outside their fuction and check this what is and it found window and setting the new paased argument values on it.
            // when we using new keyword then does not need to write that return because the new object is created on it and the value is binded to the new object that time it is not refering the value on it, so we dont need to write return that time
// }

// let st11 = StudentsData("mayur",11,"anand")
// console.log(st11)
// let st22= StudentsData("nisha",22,"baroda")
// console.log(st22)


// console.log(st11)
// console.log(st22)

// here above example in we are getting value in which is on the window object not particular object that value is binded it is taking referance form it
         //now if we call that both consol.log one by one then we are getting the same console last value because of this will be attached to the window object and the new object is taking referance of that vlaue and updating but not creating the new object of it
         //so thats why new keyword is useful for while using the constructor. the new keyword help to create new object and bind the argument values to on that fuction and gives the new object
// using new keyword on contrustor method
// const st7 = new StudentsData("Raju",44,"jamnagar")
// const st9 = new StudentsData("vishsesh",21,"bhopal")

// console.log(st7)
// console.log(st7.printStudent())
// console.log(st9)
// console.log(st9.printStudent())

// Date() Array() are the constructor it type is fuction but new created data date = new Date will be a object same as for the array

//-----------------------------------------

//4. Creating object using class syntax (ES6)
        // class's working as same as constructor but using the class we can directly call the constructor and we can write method on it that will be colled directly on it, while creating class we dont have to write parameter bracket directly use curly bracket and we can write on it constructor and methods

class Student{
    constructor(name,age,city){
        this.name =name;
        this.age=age;
        this.city=city;
        this.printIntro= function(){
            console.log(` name ${this.name} is age ${this.age} place ${this.city}`)
        };
        console.log("This is construction fuction") //when we creating the new object that time if constructor fuction in something console log whiout this then it will be pritting that time when our new obect created and assigned the values on it 

       
    }
    // while creating method we dont have to write the fuction for that method in class
     printName(){
            console.log(this.name,this.age)
        }
}
let s1 = new Student("Ram",22,"Delhi") // when we creating the new object that time if constructor fuction in something console log whiout this then it will be pritting that time when our new obect created and assigned the values on it 
let s2= new Student("Ajau",29,"Mubai")
// so when we creating the new object that time both object created and the after creation object the constructor fuction in consol will be printed because we are not assigning value we are doing printting that value
console.log(s1)
console.log(s1.printIntro())
console.log(s2)
console.log(s2.printIntro())
s1.printName()
s2.printName()

// if we want to create new object without using that class but we have use the method for creation then use call method
//==this will give error
// let s3 = printName.s3("name",22)
// console.log(s3)
let s3={
    name:"Raju",
    age:20
}
console.log("-----")
// console.log(s3)
// Student.prototype.printName(s3)
Student.prototype.printName.call(s3)