// let h3 = document.querySelector("h3")
// // h1.innerText = "Good morning"
// console.log(h3.innerText)

// console.log(h3.textContent)
// console.log(h3.innerHTML)
// console.log(h1.innerText)

// console.log(h1.innerContent)
// console.log(h1.innerHTML)
// h1.textContent="good afternoon"
// h1.innerHTML ="<h3>eerewe</h3>"

// h1.innerHTML ='<h3 style="color:blue">eerewe<p style="visibility:hidden">heyy</p></h3>'
// h1.innerHTML ="<h3>eerewe</h3>"
// h1.innerHTML ="<h3>eerewe</h3>"
// let image = document.querySelector("img")
// // console.log(image.getAttribute("src"))
// image.setAttribute("src","// let h3 = document.querySelector("h3")
// // h1.innerText = "Good morning"
// console.log(h3.innerText)

// console.log(h3.textContent)
// console.log(h3.innerHTML)
// console.log(h1.innerText)

// console.log(h1.innerContent)
// console.log(h1.innerHTML)
// h1.textContent="good afternoon"
// h1.innerHTML ="<h3>eerewe</h3>"

// h1.innerHTML ='<h3 style="color:blue">eerewe<p style="visibility:hidden">heyy</p></h3>'
// h1.innerHTML ="<h3>eerewe</h3>"
// h1.innerHTML ="<h3>eerewe</h3>"
// let image = document.querySelector("img")
// // image.getAttribute("src","https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg")
// image.setAttribute("src","https://static.vecteezy.com/system/resources/thumbnails/078/978/515/small/close-up-of-a-fresh-strawberry-with-water-droplets-on-its-surface-free-photo.jpg")
// image.removeAttribute("src")
// image.setAttribute("src","https://encrypted-tbn0.gstatic.com/images
// ?q=tbn:ANd9GcQ6f0mSF6Gr6uoeF-ahuhCfbHp6scL_jTzlFRBWZLpXC4sRgBuK8VGojJA&s=10") 


// ---- creating new element and append prepend

document.body.style.backgroundColor ="blue"
document.body.style.margin ="20px"
document.body.style.padding ="20px"
let h1 = document.createElement('h1')
h1.innerText = "Hiii there"
// h1.style.backgroundColor="yellow"
document.body.append(h1)
document.body.prepend(h1)
// document.body.removeChild(h1)
console.dir(document.body)
// h1.remove()
// h1.classList.add('highlight')
// h1.classList.remove('highlight')
h1.classList.toggle('highlight')
h1.classList.toggle('highlight')
h1.classList.toggle('highlight')
// let color = document.body.querySelector('color')
// let color = document.body.getElementsByClassName('color')
// console.log(color)
//----------
let cl = document.querySelectorAll('.color')
console.log(cl)
console.log("ddddddddddddd               ")
cl.forEach(function(val){
    console.log(val.textContent)
})
//--removing attribute
let btn = document.querySelector('button')
btn.removeAttribute("disabled")

//==> removing child
let div = document.querySelector('div')
let para = document.querySelector('.newpara')
// div.removeChild(para)

 //== adding even classes to list iteam

let ul = document.querySelector('ul')
let li = document.querySelectorAll("ul li:nth-child(2n)")

li.forEach(function(val){
    val.classList.add('bg')
})
ul.addEventListener("click",function(val){
    val.backgroundColor =red;
})
