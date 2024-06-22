//we can define function types as below, where it accepts two numbers and return a number

interface AddFn {
  (a: number, b: number): number;
}
// type AddFn=(a:number,b:number)=>number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

let user1: Greetable;

class Person implements Greetable {
  name?: string;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string): void {
    console.log(phrase + " " + this.name);
  }
}

user1 = {
  name: "Max",
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi there - I am ");
