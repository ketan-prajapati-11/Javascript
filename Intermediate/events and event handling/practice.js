let h3 = document.querySelector('h3')

let select= document.querySelector('select')

    select.addEventListener("change",function(elem){
        h3.innerText= `${elem.target.value} Device Selected`
    })
