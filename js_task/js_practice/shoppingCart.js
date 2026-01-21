// Task 2: The Shopping Cart Logic
// Scenario: A user is checking out. You need to calculate the total and verify stock.
// JavaScript
// const cart = [
// { item: "Laptop", price: 50000, quantity: 1, inStock: true },
// { item: "Mouse", price: 1500, quantity: 2, inStock: true },
// { item: "Keyboard", price: 3000, quantity: 1, inStock: false }
// ];




const cart = [
{ item: "Laptop", price: 50000, quantity: 1, inStock: true },
{ item: "Mouse", price: 1500, quantity: 2, inStock: true },
{ item: "Keyboard", price: 3000, quantity: 1, inStock: false }
];

// TASK:
// 1. Check if "every" item is inStock. Print "Ready to Ship" or "Wait".
const newCart=cart.every(item => item.inStock)
    const res= newCart?"Ready to Ship":"Wait"
console.log(res);


// 2. Filter out the items that are NOT in stock.
const instock=cart.filter( items => items.inStock===true);
console.log(instock);


// 3. Use .reduce() on the filtered list to find the final 'Total Bill'.
const Totalbill=cart.reduce((bill, item) => bill+(item.price*item.quantity),0);
console.log(Totalbill);