function counter(){
    let a =2;
    return function incraser(){
        a++;
        if(a<5){

            console.log(a)
        }
        else{
            console.error("increased from the 5")
        }
    }
}
// counter();
let newval = counter()
newval()
newval()
newval()
newval()
// counter();
// counter();
// counter();
// counter();
// counter()