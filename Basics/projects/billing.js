
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let products = {
  mobile: 500,
  laptop: 2000,
  headphone: 400,
};
let disArray =[]

// console.log()

function displayProducts() {
  for (let key in products) {
    console.log(`${key} ${products[key]}`);
    
  }
}

displayProducts();


let productName = Object.keys(products);

console.log(productName);

let totalProducts = Object.keys(products).length;
console.log(totalProducts);



const productArray = [];

// normal for loop is not working while taking the input from the user in node for readline.............
function runForLoop(i = 0) {
  if (i < totalProducts) {
    let currProduct = productName[i];
    let currPrice = products[currProduct];

    // taking iput
    rl.question(
      `Enter the product quantity ${currProduct} ${currPrice} add quantity: `,
      (userInput) => {
        
        productArray.push(Number(userInput));

       
        
        runForLoop(i + 1);
      },
    );
  } else {

    displayCart();

  }
}

runForLoop();


let cartSelectedIteam = 0;
let totalAmout = 0;
let maxPriceStr= " ";
function displayCart() {

  let maxProductTotal = 0;
  let maxProductName = " ";
  let maxProductQauntity = 0;
  let maxProductPrice = 0;

  for (let i = 0; i < totalProducts; i++) {

    const quantityCount = productArray[i];

    if (quantityCount > 0) {
      let currProduct = productName[i];
      let currPrice = products[currProduct];
      let total = currPrice * quantityCount;
      totalAmout += total
      cartSelectedIteam++;
      console.log(
        `${currProduct} price $ ${currPrice} Qauntity ${quantityCount} = ${total}`,
      );
      // let str = `${currProduct}.padEnd(15) ${quantityCount.toFixed(2)}.padStart(10) ${currPrice.toFixed(2)}.padStart(10) ${total.toFixed(2)}.padStart(10)`
      let str = currProduct.padEnd(15) + 
          String(quantityCount).padStart(10) + 
          currPrice.toFixed(2).padStart(10) + 
          total.toFixed(2).padStart(10);
          
       disArray.push(str)
      if (maxProductTotal < total) {
        maxProductTotal = total;
        maxProductName = currProduct;
        maxProductPrice = currPrice;
        maxProductQauntity = quantityCount;
      }
    }
  }
  console.log(`Total Selected iteam: ${cartSelectedIteam}`);
  str = "\nTotal Iteam: ".padEnd(15)+ String(cartSelectedIteam).padStart(10)
  disArray.push(str)
  console.log("Maximum Price iteam");
  console.log(
    `${maxProductName} 's price $ ${maxProductPrice} Qauntity ${maxProductQauntity} =  $ ${maxProductTotal}`,
  );
  maxPriceStr = maxProductName.padEnd(15) + String(maxProductQauntity).padStart(10) + String(maxProductPrice.toFixed(2)).padStart(10) +String(maxProductTotal.toFixed(2)).padStart(10)
disArray.push(maxPriceStr)

  console.log(`Total Amout ${totalAmout}`);
let totalStr = " ".padEnd(22)+"Total Amount:".padStart(10)+ String(totalAmout.toFixed(2)).padStart(10) + " ".padStart(10)
disArray.push(totalStr)

let spaceStr = "-------------------------------------------------"
disArray.push(spaceStr)

    let discount;
    // rl.question(
    //   `Enter the Discount:`,
    //   (userInput) => {
    //     // Save the input into your array
    //    discount= Number(userInput);
    //    console.log(`Entered Discount ${discount}`)
    //   },);

      
    // rl.close();
    rl.question(
  `Enter the Discount: `,
  (userInput) => {

    let discount = Number(userInput);
let disStr = " ".padEnd(22)+"Applied Discount %".padStart(3)+ String(discount.toFixed(2)).padStart(1) + " ".padStart()
disArray.push(disStr)

console.log(`Entered Discount ${discount}`);
let disPrice = totalAmout-(totalAmout*0.01*discount)
console.log(`After Discounted price:${disPrice}`)
let disTotalStr = " ".padEnd(22)+"Discounted Price".padStart(7)+ String(disPrice.toFixed(2)).padStart(8) + " ".padStart()
    disArray.push(disTotalStr)
    
console.log("\n=================================================")
console.log("                 INVOICE / BILL                 ")
console.log("=================================================")




// console.log(products);
console.log("Product".padEnd(15)+"Quantity".padStart(10)+"Price".padStart(10)+"Total".padStart(10))
console.log("-------------------------------------------------")

    disArray.forEach((val) => console.log(val))
console.log("=================================================")
console.log("\n")

    rl.close();  // 
  }
);
// console.log(discount)

  
}
