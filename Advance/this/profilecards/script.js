let form = document.querySelector(".myform");
let username = document.querySelector("#username");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#image");
let cards = document.querySelector(".cards");

let userManager = {
  users: [],
  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
  },
  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
    this.removeUser();

  },
  addUser: function () {
    this.users.push({
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value,
    });
    form.reset();
    this.renderUi();
  },
  renderUi: function () {
    cards.innerHTML = "";
    this.users.forEach(function (user) {
      let div1 = document.createElement("div");
      div1.classList.add("card");

      let image1 = document.createElement("img");
      image1.classList.add("image");
      image1.src = user.photo;

      let username1 = document.createElement("h1");
      username1.classList.add("username");
      username1.textContent = user.username;
      let role1 = document.createElement("h4");
      // role1.classList.add('role')

      role1.textContent = user.role;

      let bio1 = document.createElement("p");
      bio1.classList.add("bio");
      bio1.textContent = user.bio;
       
        let btn = document.createElement('button')
        btn.textContent= "Delet"
        btn.classList.add('delet')
      div1.appendChild(image1);
      div1.appendChild(username1);
      div1.appendChild(role1);
      div1.appendChild(bio1);
      div1.appendChild(btn)

      cards.appendChild(div1);
    });
  },

  removeUser: function () {
    cards.addEventListener('click',function(e){
        if(e.target.classList.contains("delet")){
            e.target.parentElement.remove()
        }
    })
    this.renderUi()
  },
};
userManager.init();
