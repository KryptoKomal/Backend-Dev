// Exercise 5: Event Loop
// Write a program demonstrating the execution order of setTimeout, setImmediate,
// process.nextTick, and Promise callbacks.

console.log("Start");

process.nextTick(() => {
  console.log("process.nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise.then");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});

console.log("End");