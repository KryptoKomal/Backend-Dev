// in build modules

//importing custom build functions

// method 1
const math = require("./math")
console.log(math.add(1,4) , math.remove(9,8)) 

// method 2
const {add , remove , areaOfRect } = require("./math") // de-structure method
console.log(add(6,9) , remove(69,34) , areaOfRect(5,7));