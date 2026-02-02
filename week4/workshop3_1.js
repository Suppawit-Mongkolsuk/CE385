function operation(type ,a , b,) {
  if (type === "add"){
    return a + b;
  } else if (type === "subtract"){
    return a - b;
  } else if (type === "multiply"){
    return a * b;
  } else if (type === "divide"){
    if (b !== 0){
      return a / b;
    } else {
      return "เศษเป็นศูนย์";
    }
  } else {
    return "ส่งมั่วนิ";
  }
}

module.exports = operation;