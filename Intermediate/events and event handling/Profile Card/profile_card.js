let form = document.querySelector('form')
console.log(form)
let inputs = document.querySelectorAll('input')
let main =document.querySelector('.main')
let cards=document.querySelector('.cards')
// console.lo
form.addEventListener('submit',function(evt){
    evt.preventDefault()
    // console.log(inputs)
    // console.log(
    //     inputs[0].value,
    //     inputs[1].value,
    //     inputs[2].value,
    //     inputs[3].value,
    //     inputs[4].value 
    //     )

    let card = document.createElement('div')
    card.classList.add('card')
    let profile_pic = document.createElement('div')
    profile_pic.classList.add('profile-pic')

    let image = document.createElement('img')
    image.setAttribute('src',inputs[0].value)

    let name = document.createElement('div')
    name.classList.add('name')
    
    let h3 = document.createElement('h3')
    h3.textContent=inputs[1].value
    
    let occupation = document.createElement('div')
    occupation.classList.add('occupation')

    let h5 = document.createElement('h5')
    h5.textContent= inputs[2].value

    let summury = document.createElement('div')
    summury.classList.add('summury')

    let p = document.createElement('p')
    p.textContent= inputs[3].value

profile_pic.appendChild(image)
name.appendChild(h3)
occupation.appendChild(h5)
summury.appendChild(p)

card.appendChild(profile_pic)
card.appendChild(name)
card.appendChild(occupation)
card.appendChild(summury)

cards.appendChild(card)

inputs.forEach(function(inp){
    if(inp.value != 'submit'){
        inp.value = ""
    }
})
})

