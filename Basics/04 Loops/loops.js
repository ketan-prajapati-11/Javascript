// for while do while

// for (let i = 0; i < 100; i++) {
//     console.log(i)
// }
let i= 1;
// while (i<101) {
//     console.log(i)
//     i++
// }
// do {
//     console.log(i)
//     i++;
// } while (i<100);
// for (let i = 0; i < 10; i++) {
//     if(i==4){
//         // break; break the loop and end it
//         continue;
//     }
//     console.log(i) // continue the loop and skipping that iternation execution that time
    
// }

//printing the number odd or even from till user input

let val = prompt("Enter the value till print number is odd or even:")

for (let i = 0; i < val; i++) {
    if(i %2===0){
        console.log(`${i} is Even`)
    }else{
        console.log(`${i} is Odd`)
    }
    
}