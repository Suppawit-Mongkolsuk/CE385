sumNum = 0;
productOdd = 1;

for (i = sumNum ; i <= 50 ; i++) {
  if (i % 2 === 0) {
    sumNum += i;
  }
}
for (x = productOdd ; x <= 10 ; x++) {
  if (x % 2 !== 0) {
    productOdd *= x;
  }
}
console.log("ผลรวมเลขคู่ตั้งเเต่ 0 ถึง 50 คือ " + sumNum);
console.log("ผลคูณเลขคี่ตั้งเเต่ 1 ถึง 10 คือ " + productOdd);