class User{
    constructor(name,email,address){
        this.name=name
        this.email=email
        this.address=address
        this.role= "user"
    }
    write(text){
        let h1 = document.createElement('h1')
        h1.textContent=`${this.name} : ${text}`
        document.querySelector('body').appendChild(h1)
    }
   
}

class Admin extends User{
    constructor(name,email,address){
        super(name,email,address)  
this.role="admin"
  }
   remove(){
        document.querySelectorAll('h1').forEach(function(ele){
            ele.remove()
        })
    }
}

let u1 = new User("ketan","ke@gmail","in")
let u2 = new User("rahul","ke@gmail","in")
let a1 = new Admin("Ketan-admin","meh","usa")