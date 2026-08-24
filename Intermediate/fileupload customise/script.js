let fileinp = document.querySelector('.inpfile')
let btn = document.querySelector('.btn')

btn.addEventListener('click',function(){
    fileinp.click()
})
fileinp.addEventListener('change',function(evt){
    let file = evt.target.files[0]
    if(file){
        btn.textContent = file.name
    }
})