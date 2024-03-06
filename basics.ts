function add(n1: number, n2: number, showResult: boolean) {
  if (showResult) {
    console.log(n1 + n2);
  } else {
    return n1 + n2;
  }
}

let num1 = 5;
const num2 = 2.8;
const printResult = false;

const result = add(num1, num2, printResult);
console.log(result);
