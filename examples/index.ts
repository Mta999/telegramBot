// const x = '2020-1-10';
// const y = '2020-1-10';
// const date = new Date(x).toISOString();
// const mongoDate = new Date(y).toISOString()
// console.log(mongoDate);
// const parsedDate = mongoDate.split("T")[0]
// console.log(parsedDate);


// const londonTime = new Date().toLocaleString('en-AM  ', { timeZone: 'Europe/London' })
import { map, filter, find, reduce } from "lodash"
const date = "2020-05-07"

const arr = [{
    id: "ewjhdbs",
    createdAt: "2020-05-07T09:32:55.574Z"
},
{
    id: "er",
    createdAt: "2020-05-08T09:32:55.574Z"
},
{
    id: "eregdvr",
    createdAt: "2020-06-07T09:32:55.574Z"
}]


const y = map(arr, (el) => {
    const x = el.id
    if (x === date) {
        return el
    }
    // console.log((x));
})

// console.log(y);

// arr[5] ="boxk";

// const z = find(y, (el) => el !== undefined)
// const z1 = filter(y, (el) => el !== undefined)

// // console.log(z1);


// const u = reduce(arr, (acc, el) => {
//     const x = el.createdAt.split("T")[0]
//     if (x === date) {
//         acc.push(el)
//     }
//     return acc
// }, [])
// console.log(u);



  
// const CronJob = require('cron').CronJob;

// console.log('Before job instantiation');
// const job = new CronJob('00 00 00 * * *', function() {
// 	const d = new Date();
// 	console.log('Midnight:', d);
// });
// console.log('After job instantiation');
// job.start();

// var CronJob = require('cron').CronJob;
// var job = new CronJob('55 17 * * * *', function() {
//   console.log('You will see this message at 17:55');
// }, null, true, 'Asia/Yerevan');
// job.start();


// const CronJob = require('cron').CronJob;

// console.log('Before job instantiation');
// const job = new CronJob('* 20 18 * * *', function() {
// 	const d = new Date();
//     console.log('At 15 Minutes:', d);
//     job.stop();
// });
// console.log('After job instantiation');
// job.start();