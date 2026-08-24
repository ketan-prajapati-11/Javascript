let h3= document.querySelector('h3')

document.body.addEventListener('keydown',function(elem){
   if(elem.key === " "){
    h3.textContent ="SPEC"
   }
   else{

     h3.textContent =` ${elem.key}`
    //  h3.textContent.style.backgroundColor ="White"
    // console.log(elem.key.value)

   }
})
