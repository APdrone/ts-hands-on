function generateError(message: string, code: number): never {
  throw { message, errorCode: code };
}

const result = generateError("An Error occured!", 500);
//we never will get result thus never type can be "never" or "void" , error will be thrown and it will never return anything
console.log(result);
