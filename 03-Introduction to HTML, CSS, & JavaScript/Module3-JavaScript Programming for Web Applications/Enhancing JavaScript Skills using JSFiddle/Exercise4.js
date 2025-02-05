const products = [
    { product: "Laptop", stock: 5 },
    { product: "Headphones", stock: 0 },
    { product: "Smartphone", stock: 3 }
];

function checkStockLevels(products){
    for(let i = 0; i < products.length; i++){
        if (products[i].stock > 0){
            console.log(`${products[i].product} is in stock`);
        } else {
            console.log(`${products[i].product} is out of stock`);
        }
    }
}

checkStockLevels(products);