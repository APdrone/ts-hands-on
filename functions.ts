// function add(n1: number, n2: number): number {
//   return n1 + n2;
// }

// function printResult(num: number): void {
//   console.log("Result: " + num);
// }

// printResult(add(5, 12));

// let combineValues: (a: number, b: number) => number;

// combineValues = add;

// console.log(combineValues(8, 8));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
});

//we will get error on adding another argument in callback
// addAndHandle(10, 20, (result,b) => {
//   console.log(result);
// });

//but we wont error on adding return statment and this is not bug but intentional as in the function "addAndHandle" we have decalred
//the return as void so wont care of the return value as that is not getting used in function if we see its defintion

addAndHandle(20, 30, (result) => {
  console.log(result);
  return result;
});
