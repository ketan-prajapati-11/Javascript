class Createpencil{
    constructor(name,comapny,price,color){
        this.name = name;
        this.comapny= comapny;
        this.price=price;
        this.color=color
    }
    write(text){
        let h1= document.createElement('h1');
        h1.textContent= text;
        h1.style.color=this.color
        document.querySelector('body').appendChild(h1)
    }
    erase(){
        document.querySelectorAll('h1').forEach(ele =>{
              if(ele.style.color === this.color){
                ele.remove()
            }
        })
    }
}
let p1 = new Createpencil("apsara","gvagan",11,"blue")
let p2 = new Createpencil("natur","gvagan",11,"green")