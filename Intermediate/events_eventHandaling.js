console.log("running")
// let ul = document.querySelector('ul')
// let li = document.querySelectorAll("ul li:nth-child(2n)")
// let p = document.querySelector('p')
// li.forEach(function(val){
//     val.classList.add('bg')
// })
// p.addEventListener("click",function(){
//     p.style.backgroundColor ='yellow';
// })
//p.removeEventListener("click",function(){
// p.style.backgroundColor='yellow' })
let clr = document.querySelectorAll('.color')

clr.forEach(function(elem){
    elem.addEventListener('click',function(){
        elem.style.backgroundColor ='red'
    })
})                                     
let input = document.body.querySelector('input')
// input.addEventListener("input",function(){
//     console.log("character")
// })
// input.addEventListener("input",function(ele){
//     console.log(ele.data)
// })

// input.addEventListener("input",function(eve){
//     if(eve.data !== null){
//         console.log(eve.data)
//     }
// })
input.addEventListener("input",function(ele){
    if(ele.data !== null){
        console.log(ele.data)
    }
})
