const express = require('express'); // เรียกใช้งาน Express module
const app = express(); // สร้าง Express application

app.use(express.json()); // ใช้ middleware เพื่อแปลง request body เป็น JSON
app.use(express.urlencoded({ extended: true })); // ใช้ middleware เพื่อแปลง URL-encoded data

const data = [
  { id: 1, name: 'boss', age: 20 },
  { id: 2, name: 'tle', age: 22 },
  { id: 3, name: 'gus', age: 70 }
]; // สร้างตัวแปรเก็บข้อมูลเป็น array

const ValidateMiddleware = (req , res , next) => { // สร้าง middleware สำหรับตรวจสอบค่าที่ส่งมา
  const {name , age} = req.body; // ดึงค่าชื่อและอายุจาก body (สำหรับ POST)
  if (!name || !age) {
    return res.status(400).send({ error : 'Missing name or age in query parameters' }); // ตรวจสอบว่ามีการส่งค่ามาหรือไม่
  }
  next(); // ถ้าตรวจสอบผ่าน ให้ดำเนินการต่อไป
}
// เเบบ query parameters
app.get('/search', ValidateMiddleware, (req , res) => {
  const name = req.query.name;// ดึงค่าชื่อจาก query parameters
  const age = req.query.age;
  res.send(`Hello, ${name}! You are ${age} years old.`); // ส่งข้อความตอบกลับ 
});

// เเบบ path parameters
app.get('/api/data', (req , res) => {
  //res.send(data); // ส่งข้อมูลทั้งหมดเป็น response
  // เเปลงให้ส่ง res เป็น json stringที่อ่านง่าย
  //res.type('text/plain'); // กำหนดประเภทของ response เป็น plain text
  //res.send(JSON.stringify(data , null , 2)); // ส่งข้อมูลทั้งหมดเป็น response ที่เเปลงเป็น JSON string
  const list = data.map(d => `ID: ${d.id}, Name: ${d.name}, Age: ${d.age}`).join('\n');
  res.send(list);
})
app.get('/api/data/:id' , (req , res) => {
  const id = parseInt(req.params.id); // ดึงค่าพารามิเตอร์ id จาก path เเละเเเปลงเป็นตัวเลข
  const item = data.find(d => d.id === id);
  if (item) {
    res.send(`Name:${item.name} / มีอายุ:${item.age}`); // ส่งข้อมูลที่ตรงกับ id เป็น response
  } else {
    res.status(404).send({ error: 'Item not found' }); // ถ้าไม่พบข้อมูล ให้ส่ง response 404
  }
})

app.post('/api/data/Post', ValidateMiddleware, (req , res) => { // สร้าง route สำหรับเพิ่มข้อมูลใหม่
  const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1; // สร้าง id ใหม่โดยเพิ่มจาก id สูงสุดใน data
  const { name,age } = req.body; 
  const newItem = { id: newId , name ,age};
  data.push(newItem); // เพิ่มข้อมูลใหม่เข้าไปใน array
  res.status(201).send(`เพิ่มข้อมูลสำเร็จ ID:${newItem.id} Name:${newItem.name} Age:${newItem.age} ปี`); 

}); 

app.put('/api/data/put/:id' , ValidateMiddleware, (req , res) => {  // สร้าง route สำหรับอัปเดตข้อมูล
  const id = parseInt(req.params.id); 
  const { name , age } = req.body;
  const itemIndex = data.findIndex(d => d.id === id); // ค้นหาดัชนีของข้อมูลที่ตรงกับ id
  if (itemIndex === -1) {
    return res.status(404).send({ error: 'ไม่เจอข้อมลูที่ต้องการ'})
  }
  data[itemIndex] = { id:data[itemIndex].id , name , age }; // อัปเดตข้อมูลที่ตรงกับ id
  res.status(200).send('อัปเดตข้อมูลสำเร็จ');
});

app.delete('/api/data/delete/:id' , (req , res) => { // สร้าง route สำหรับลบข้อมูล
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex(d => d.id === id);
  if (itemIndex === -1) {
    return res.status(404).send({ error: 'ไม่เจอข้อมลูที่ต้องการ'});
  }
  data.splice(itemIndex , 1); // ลบข้อมูลที่ตรงกับ id
  res.status(200).send('ลบข้อมูลสำเร็จ');
},); 

app.listen(3000, () => {
  console.log('Express server listening on port 3000'); // กำหนดพอร์ตที่ server จะฟัง
}); 