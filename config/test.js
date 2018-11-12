const moment = require('moment');

console.log(new Date('September 9 2017').getTime());
console.log(moment('2017-09-10T00:00:00.000Z'));

console.log(moment().toLocaleString());