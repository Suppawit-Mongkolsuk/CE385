function calBmi(weight,height){
  const bmi = weight / height**2;
  let category = "";
  
  if (bmi < 18.5){
    category = "ผอมเกินไป";
  } else if (bmi >= 18.5 && bmi < 25){
    category = "น้ำหนักปกติ";
  } else if (bmi >= 25 && bmi < 30){
    category = "ไอบอส";
  } else if (bmi >= 30){
    category = "ไอบอส 2 คน";
  }
  
  return { bmi:(bmi.toFixed(2)), category: category };
}

console.log(calBmi(70, 1.75));