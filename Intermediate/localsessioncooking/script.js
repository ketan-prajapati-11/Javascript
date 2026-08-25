let btn = document.querySelector('button')
let systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
document.cookie="username:ketan"
sessionStorage.setItem("data","newfilecreateing")
console.log(sessionStorage)
if(localStorage.getItem('theme')==='dark'){
    document.body.classList.add('dark')
    btn.classList.add('dark')

}
else if((localStorage.getItem('theme')=== (null || undefined) )&& systemIsDark){
     document.body.classList.add('dark')
    btn.classList.add('dark')
}
btn.addEventListener('click',function(){
    document.body.classList.toggle('dark')
    btn.classList.toggle('dark')

    if( document.body.classList.contains('dark') ){
        localStorage.setItem('theme','dark')
    }
    else{
        localStorage.setItem('theme','white')

    }
})