const fectchDataFromServer1 = () => {
  return new Promise((resolve, reject) => {

    const data = {status: 200, id:1, name:"title1"};
    setTimeout(() => {
      resolve(data);
    }, 2000);
  })
}
const fectchDataFromServer2 = () => {
  return new Promise((resolve, reject) => {

    const data = {status: 500, id:2, name:"title2"};
    setTimeout(() => {
      reject("status:"+ " " + data.status + " " + "ไม่สามารถดึงข้อมูลได้");
    }, 1000);
  })
}
const fectchDataFromServer3 = () => {
  return new Promise((resolve, reject) => {

    const data = {status: 200, id:3, name:"title3"};
    setTimeout(() => {
      resolve(data);
    }, 3000);
  })
}

module.exports = {fectchDataFromServer1, fectchDataFromServer2, fectchDataFromServer3};