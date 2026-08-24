let box = document.querySelector('.box')

// box.addEventListener("mouseover",function(){
//     box.style.backgroundColor = 'red'
// })
// box.addEventListener('mouseout',function(){
//     box.style.backgroundColor = 'yellow'
// })
window.addEventListener("mousemove",function(evt){
    let topY = evt.clientY-200
    let topX = evt.clientX-200
    box.style.top = topY +"px"
    box.style.left = topX +"px"
})