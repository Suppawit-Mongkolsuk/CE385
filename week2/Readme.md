# Week 2 - Workshop Exercises

นี่คือชุดแบบฝึกหัดสำหรับสัปดาห์ที่ 2 ซึ่งประกอบด้วยการเขียน JavaScript เพื่อฝึกฝน Loop และ Function

---

## Workshop 3.1 - Loop และ Conditional Statements

**ไฟล์:** `workshop3.1.js`

### วัตถุประสงค์

ฝึกฝนการใช้งาน loop และ conditional statements ในการคำนวณ:

1. ผลรวมของเลขคู่ตั้งแต่ 0 ถึง 50
2. ผลคูณของเลขคี่ตั้งแต่ 1 ถึง 10

### คำอธิบายโค้ด

```javascript
// ส่วนแรก: คำนวณผลรวมเลขคู่ (0-50)
for (i = sumNum; i <= 50; i++) {
  if (i % 2 === 0) {
    sumNum += i;
  }
}

// ส่วนที่สอง: คำนวณผลคูณเลขคี่ (1-10)
for (x = productOdd; x <= 10; x++) {
  if (x % 2 !== 0) {
    productOdd *= x;
  }
}
```

### ผลลัพธ์

```
ผลรวมเลขคู่ตั้งเเต่ 0 ถึง 50 คือ 650
ผลคูณเลขคี่ตั้งเแต่ 1 ถึง 10 คือ 945
```

**หมายเหตุ:** 945 = 1 × 3 × 5 × 7 × 9

### การรัน

---

## Workshop 3.2 - Function และ Object Return

**ไฟล์:** `workshop3.2.js`

### วัตถุประสงค์

ฝึกฝนการสร้าง function ที่คำนวณ BMI (Body Mass Index) และจำแนกประเภทน้ำหนัก

### คำอธิบายโค้ด

```javascript
function calBmi(weight, height) {
  // คำนวณ BMI: น้ำหนัก / (ส่วนสูง²)
  const bmi = weight / height ** 2;
  let category = '';

  // จำแนกประเภทตามค่า BMI
  if (bmi < 18.5) {
    category = 'ผอมเกินไป';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'น้ำหนักปกติ';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'ไอบอส';
  } else if (bmi >= 30) {
    category = 'ไอบอส 2 คน';
  }

  // Return object ที่มีค่า bmi และ category
  return { bmi: bmi.toFixed(2), category: category };
}
```
