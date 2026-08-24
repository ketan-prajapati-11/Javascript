let form = document.querySelector('form')
let password = document.querySelector('.password')
let email = document.querySelector('.email')

form.addEventListener('submit',function(evt){
evt.preventDefault();

document.querySelector('.passwordError').textContent = ""
document.querySelector('.emailError').textContent = ""

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   let emailCheck = emailRegex.test(email.value)
   let passwordCheck = passwordRegex.test(password.value)

   let isValid = true

   if(!emailCheck){
       document.querySelector('.emailError').textContent = "Email is Incorrect"
    document.querySelector('.emailError').style.display ='initial'
    
    isValid = false
}
if(!passwordCheck){
       document.querySelector('.passwordError').textContent = "Password is Incorrect"
    document.querySelector('.passwordError').style.display = 'initial'
    isValid = false
   }
if(isValid){
    document.querySelector('.valid').textContent="Valid Email and password"
}

})