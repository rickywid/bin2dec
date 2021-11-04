const calculate = (inputVal:string) => {
    const values = [];

    for (let i = inputVal.length-1; i >= 0; i--) {
      console.log(i)
      if (parseInt(inputVal[i]) === 1) {
        console.log(true)
        values.push(Math.pow(2, i))
      } else {
        console.log(false)
        values.push(0);
      }
    }
    console.log(values)
    return values;
  }

  export default calculate;