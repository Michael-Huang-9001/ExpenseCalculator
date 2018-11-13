const moment = require('moment');

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
var first = new Date(year, month, 1);
var last = new Date(year, month + 1, 0);

//console.log(moment());
console.log(moment().format())