function calculateTotalSales(sales){
    let sum=0;
    for (let i=0;i<sales.length;i++){
        sum+=sales[i].quantity*sales[i].price;
    }
    return sum;
}

const sales=[
    { item: "Laptop", quantity: 2, price: 800 },
    { item: "Monitor", quantity: 1, price: 150 },
    { item: "Mouse", quantity: 4, price: 25 }
];

console.log(calculateTotalSales(sales));
