// Task 1: The "Order Status"
// Goal: Practice basic resolve and reject logic.
// ● The Scenario: Create a function checkOrderStatus(orderId).
// ● The Logic: * If the orderId is a number, resolve after 1 second with
// "Order Shipped".
// ○ If the orderId is not a number (e.g., a string or null), reject with
// "Invalid Order ID".

// ● The Requirement: Use an async function with try/catch to call this
// and log the result

function checkOrderStatus(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof orderId === "number") {
        resolve("Order Shipped");
      } else {
        reject("Invalid Order ID");
      }
    }, 1000);
  });
}

async function run() {
  try {
    const result = await checkOrderStatus(123);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();