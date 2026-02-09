# Week 5 - Express API Server

Express API สำหรับจัดการข้อมูลผู้ใช้

## การรัน

```bash
npm install express
node index.js
```

Server จะรันที่ `http://localhost:3000`

---

## API Routes

### 1. GET `/api/data`

ดึงข้อมูลผู้ใช้ทั้งหมด

```
GET http://localhost:3000/api/data
```

### 2. GET `/api/data/:id`

ดึงข้อมูลผู้ใช้ตามรหัส

```
GET http://localhost:3000/api/data/1
```

### 3. POST `/api/data/Post`

เพิ่มผู้ใช้ใหม่

```bash
curl -X POST http://localhost:3000/api/data/Post \
  -H "Content-Type: application/json" \
  -d '{"name":"john","age":25}'
```

ต้อง validate ชื่อและอายุ ไม่เว้นว่างเลย

### 4. PUT `/api/data/put/:id`

อัปเดตข้อมูลผู้ใช้

```bash
curl -X PUT http://localhost:3000/api/data/put/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"boss_update","age":21}'
```

ต้องส่ง name และ age มา

### 5. DELETE `/api/data/delete/:id`

ลบข้อมูลผู้ใช้

```bash
curl -X DELETE http://localhost:3000/api/data/delete/1
```

### 6. GET `/search`

ค้นหาด้วย query parameters

```
GET http://localhost:3000/search?name=boss&age=20
```

---

## Middleware

`ValidateMiddleware` - ตรวจสอบว่ามี name และ age ส่งมาไม่

ใช้กับ POST, PUT, และ GET /search

---

## Data Structure

```javascript
{
  id: 1,
  name: "boss",
  age: 20
}
```

---

## Status Code

- `200` - สำเร็จ
- `201` - สร้างใหม่สำเร็จ (POST)
- `400` - ข้อมูลไม่ถูกต้อง
- `404` - ไม่พบข้อมูล
