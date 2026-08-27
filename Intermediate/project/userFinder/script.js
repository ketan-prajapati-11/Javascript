let users = [
  {
    name: "amisha rathore",
    pic: "https://i.pinimg.com/736x/cd/9b/1c/cd9b1cf5b96e8300751f952488d6c002.jpg",
    bio: "silent chaos in a loud world 🌑🖤 | not for everyone",
  },
  {
  name: "Aarav Sharma",
  pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpN4zcuwhB2gL4cHQfY0rLOBlSyaIJaDgvMUVEeFWhBw&s=10",
  bio: "building my own path 🚀 | coffee, code & creativity ☕💻",
},
{
  name: "Maya Kapoor",
  pic: "https://i.pinimg.com/736x/1f/2f/85/1f2f856bf3a020ed8ee9ecb3306ae074.jpg",
  bio: "finding beauty in simple things 🌸 | dream big ✨",
},
{
  name: "Kabir Malhotra",
  pic: "https://pbs.twimg.com/profile_images/1820089785995706370/UbCOxWYV.jpg",
  bio: "focused on the journey 🎯 | stay curious, stay humble",
},
{
  name: "Rohan Mehta",
  pic: "https://pbs.twimg.com/profile_images/1850803497932910592/ezoK2Dty_400x400.jpg",
  bio: "calm mind, clear vision 🖤 | one step at a time",
},
{
  name: "Arjun Verma",
  pic: "https://links.omarcosvianna.com/assets/hero-profile-BopB-M_R.jpg",
  bio: "creative mind 🎨 | turning ideas into reality 🚀",
},
  {
    name: "diya bansal",
    pic: "https://i.pinimg.com/736x/74/b0/67/74b067e6c5ece09d99f68c42c5f6754e.jpg",
    bio: "a little chaos, a lot of art 🎨✨ | just vibes",
  },
  {
    name: "tanay rawat",
    pic: "https://i.pinimg.com/736x/9b/78/b9/9b78b95425278ee37e88869b8c5fb2c6.jpg",
    bio: "don’t text, just vibe 🪩 | soft heart, sharp mind",
  },
  {
    name: "mohit chhabra",
    pic: "https://i.pinimg.com/736x/22/8b/cf/228bcf5a0800f813cd1744d4ccbf01ea.jpg",
    bio: "aesthetic overload 📸🕊️ | living in lowercase",
  },
];

function showUsers(arr) {
  arr.forEach((user) => {
    let content = document.createElement("div");
    content.classList.add("content");

    let image = document.createElement("img");
    image.classList.add("image");
    // image.setAttribute(
    //   "src",
    //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZs0TabAjUwKNs2545IWQ44qA3L2AEZs0z1Jg-dCNdiHm9zB1Vx5l_XQ&s=10",
    // );
    image.src = user.pic
    let h3 = document.createElement("h3");
    h3.textContent = user.name

    let p = document.createElement("p");
    p.textContent = user.bio

    content.appendChild(h3);
    content.appendChild(p);

    let card = document.createElement("div");
    card.classList.add("card");

    card.appendChild(image);
    card.appendChild(content);

    let container = document.querySelector(".container");

    container.appendChild(card);
  });
}

showUsers(users)

let inp = document.querySelector('input')
inp.addEventListener('input',function(){
    let newUser = users.filter((user)=>
    { 
        return user.name.startsWith(inp.value)
    })
    document.querySelector('.container').innerHTML =""
    showUsers(newUser)
})
