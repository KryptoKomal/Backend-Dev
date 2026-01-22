// Exercise 2: Custom Module
// Build a module called stringUtils.js that exports functions for capitalizing strings, reversing
// strings, and counting vowels.

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

module.exports = {
  capitalize,
  reverse,
  countVowels
};