const fectchDataWithCallback = (callback) => {
  console.log("Start...");

  setTimeout(() => {
    const data = {id: 1, name: "title"};
    callback(null,data);
  }, 2000);
}

const fectchDataWithPromise = () => {
  return new Promise((resolve,reject) =>  {
    console.log('start Promise')

    setTimeout(() => {
      const data = {id: 1, name: "title" , age: 22};
      resolve(data);
      reject('Error: ไม่สามารถดึงข้อมูลได้');
    }, 2000);
  })
}

module.exports = { fectchDataWithCallback, fectchDataWithPromise };