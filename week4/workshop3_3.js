const simulateTimeout = (timeouts) => {
  return new Promise((resolve , reject) => {
    setTimeout (() => {
      numMilliseconds = timeouts * 1000;
      if (numMilliseconds >= 1000) {
        resolve(`Success: waited for ${numMilliseconds} milliseconds`);
      } else {
        reject(`Error: waited for only ${numMilliseconds} milliseconds`);
      }
    }, 2000);
  });
}

const performAsyncTasks = async () => {
  try {
    const result1 = await simulateTimeout(2);
    console.log(result1);

    const result2 = await simulateTimeout(1);
    console.log(result2);
  } catch (error) {
    console.log(error);
  }
}

module.exports = performAsyncTasks;