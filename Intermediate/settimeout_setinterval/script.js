
let a= 10
let counting = setInterval(() => {
    console.log(a)
    a++;

}, 1000);
let time = setTimeout(() => {
    clearInterval(counting)
}, 3000);
clearTimeout(time)

