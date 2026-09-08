function Createpencil(name, price, color, brand) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.brand = brand;

  // this.write = function(text){
  //     let h1 = document.createElement('h1')
  //     h1.textContent = text
  //     h1.style.color = color
  //     document.querySelector('body').appendChild(h1)

  // }
}
Createpencil.prototype.write = function(text) {
  let h1 = document.createElement("h1");
  h1.textContent = text;
  h1.style.color = this.color;
  document.querySelector("body").appendChild(h1);
};
let pencil1 = new Createpencil("nataraj", 10, "blue", "Natturaj");
console.log(pencil1);
let apsara = new Createpencil("apsara", 10, "green", "apsara");
console.log(apsara);

