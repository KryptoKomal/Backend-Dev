// Task 3 : Smart-Shop Dashboard

// Goal: Create a script that simulates a user logging in and seeing their "Delivered" orders with a
// "Premium Discount."

// A .Write two functions that return Promises:
// ● fetchUser(id): Resolves in 1s with { name: "Rahul", isPremium: true }.
// ● fetchOrders(id): Resolves in 2s with: [{ item: "Laptop", price: 1000,
// status: "delivered" }, { item: "Phone", price: 500, status:
// "pending" }].
// B. Create an async function displayDashboard(id) that:
// 1. Awaits both functions.
// 2. Filters the array to keep only "delivered" orders.
// 3. Maps the data to apply a 10% discount to the price only if isPremium is true.
// 4. Prints a greeting and the final total of the delivered items.

// ** Wrap everything in a try...catch block to handle potential errors.


function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Rahul", isPremium: true });
    }, 1000);
  });
}

function fetchOrders(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { item: "Laptop", price: 1000, status: "delivered" },
        { item: "Phone", price: 500, status: "pending" }
      ]);
    }, 2000);
  });
}

async function displayDashboard(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(id);

    const deliveredOrders = orders.filter(order => order.status === "delivered");

    const discountedOrders = deliveredOrders.map(order => {
      const finalPrice = user.isPremium ? order.price * 0.9 : order.price;
      return { ...order, price: finalPrice };
    });

    const total = discountedOrders.reduce((sum, order) => sum + order.price, 0);

    console.log(`Hello ${user.name}`);
    console.log(discountedOrders);
    console.log(`Final Total: ${total}`);
  } catch (error) {
    console.log(error);
  }
}

displayDashboard(1);