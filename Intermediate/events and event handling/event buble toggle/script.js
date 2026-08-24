let ul = document.querySelector('ul')
ul.addEventListener('click',function(elem){
    elem.target.classList.toggle('line-through')
})