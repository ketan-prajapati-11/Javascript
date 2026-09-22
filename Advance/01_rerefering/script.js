// function privatecount(){
//     a=0;
//     return function abc(){
//         a++
//         if(a<5){
//             console.log(`clicked : ${a} clicked`)
//         }
//         else{
//             console.error("exected from count 5")
//         }
//     }
// }
// let count = privatecount()
// count()
// count()
// count()
// count()
// count()
// count()

// this keyword

let obj= {
    name:"Ketan",
    print:function (){
        let a=5
        return function(){
            console.log(this.name)
        }
    }
}
let ob1 = obj.print()
console.log(ob1())
// it gives like window.returnfuction
let obj1= {
    name:"Ketan",
    print:function (){
        let a=5
         function nam(){
            console.log(this.name)
        }
        nam()
    }
}
console.log(obj1.print())

let obj3= {
    name:"Ketan",

    [this.name]:function (){
        let a=5
        
            console.log(this.name)
    
        
    }
}
let nm = {name:"rhaul"}
console.log(obj3)
// obj3.print.call(nm)
// obj3.print.call(this)

const obj6 = {
    name: "Ketan"
};
console.log(obj6)
    function nam(a,b,c){
            console.log(this,a,b,c)
        }
        console.log("----------")
        nam.call(obj6,1,2,3)
        nam.apply(obj6,[1,2,3])