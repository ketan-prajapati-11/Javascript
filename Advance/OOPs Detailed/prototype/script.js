// prototype
//  is like a blueprient of taking reference without we need to apply on the every object we can get it by referance. when the new created object has same function is defiend that time for the save of space  memory we use protot type where are taking  only one time prototype and we can use on created object which is created by thier constructor . when we try to open that time we can get it in prototype
// when we creating new object that time it is automatically link to prototype of that class or constructor
//when we are suing that class that time constructor and prototype is automatically used on that new object creation time

function Student(name, age) {
  this.name = name;
  this.age = age;
  
}
Student.prototype.printName = function () {
  console.log(`name: ${this.name} age : ${this.age}`);
};

const s1 = new Student("Raju", 12);
console.log(s1);
console.log("=====");
s1.printName();
const s2 = new Student("maya", 22);

// creating backAccount using prototype

function bankAccount(holderName, balance) {
  this.holderName = holderName;
  this.balance = balance;
    this.deposit = function (amout) {
  console.log(`${this.holderName} in deposite money ${amout}`)
};

}
bankAccount.prototype.showDetail = function () {
  console.log(`holdername: ${this.holderName} balance: ${this.balance}`);
};

bankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};
bankAccount.prototype.widraw = function (amount) {
  this.balance -= amount;
};
let ajayAccount = new bankAccount("ajay", 150);
// console.log(ajayAccount)
// ajayAccount.widraw(100)
// console.log(ajayAccount.balance)
// ajayAccount.deposit(11100)
// console.log(ajayAccount.balance)

mayaAccount = new bankAccount("maya", 2000);
mayaAccount.deposit(5000);
// mayaAccount.widraw(5500)

console.log(ajayAccount);
console.log(mayaAccount);

ajayAccount.showDetail();
mayaAccount.showDetail();
 
//----- class in prototype
// class in we can dirctly use prototype without writting somwhere elase 
class Student1{
    constructor(name,age){
        this.name= name;
        this.age= age;

    }
    printStudent(){
        console.log(`student name is ${this.name} and age is ${this.age}`)
    }
}
const stu1 = new Student1("Ram",11)
stu1.printStudent()