let sp = document.querySelector('.sp')
let inp = document.querySelector('input')

inp.addEventListener('input',function(){
    let count = 20 - inp.value.length
    console.log(count)
    if(count < 0){
        sp.style.color= 'red'
        sp.textContent = count
    }
    else {
        sp.style.color='white'
        sp.textContent = count
    }
})