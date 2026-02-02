// const http = require('http'); // การเริ่มใช้งาน http module

// // สร้าง HTTP server ง่ายๆ
// const server = http.createServer((req, res) => { 
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });
// // กำหนดให้ server ที่พอร์ต 3000 เเละเริ่มServer
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Server running at http://localhost:3000/');
// });

// ==========================================================================

// const Express = require('express'); // เรียกใช้งาน Express module
// const app = Express(); // สร้าง Express application

// port = 3000; // กำหนดพอร์ตที่ server จะฟัง

// // สร้าง Route ที่จะตอบกลับเมื่อ cline มีการร้องขอ (request) มาที่ path "/"
// app.get('/', (req,res) => {
//   res.send('Hello World from Express!');
// })
// // กำหนดพอร์ตที่ server จะฟัง
// app.listen(port,() => {
//   console.log('Express server listening on port ' + port);
// })

// ==========================================================================
// workshop 3.1
//const op = require('./workshop3_1');
//console.log(op('add',10,5)) 
//console.log(op('subtract',10,5))
//console.log(op('multiply',10,5))
//console.log(op('divide',10,5))
//console.log(op('divide',10,0))
//console.log(op('modulus',10,5))

// ==========================================================================
// workshop 3.2

// const fectchDataWithCallback = require('./workshop3_2');
// fectchDataWithCallback((error , data) => {
//   if (error) {
//     console.log("Error:", error);
//   } else {
//     console.log("ข้อมูลคือ", data);
//   }
// })

// ==========================================================================
// workshop 3.2

// const { fectchDataWithPromise } = require('./workshop3_2');
// fectchDataWithPromise()
//   .then((data) => {
//     console.log("ข้อมลูคือ ", data);
//   })
//   .catch((error) => {
//     console.log("Error:", error);
//   })

// ==========================================================================
// workshop 3.3

// const performAsyncTasks = require('./workshop3_3');
// performAsyncTasks();

// ==========================================================================
// workshop 3.4

const {fectchDataFromServer1, fectchDataFromServer2, fectchDataFromServer3} = require('./workshop3_4');

Promise.race([
  fectchDataFromServer1(),
  fectchDataFromServer2(),
  fectchDataFromServer3()
])
.then((data) => {
  console.log(data);
})
.catch((error) => {
  console.log(error);
})

Promise.allSettled([
  fectchDataFromServer1(),
  fectchDataFromServer2(),
  fectchDataFromServer3()
])
.then((results) => {
  console.log(results);
})
.catch((error) => {
  console.log(error);
})