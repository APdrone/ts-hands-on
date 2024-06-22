// interface AddFn {
//   (a: number, b: number): number;
// }

// let adds: AddFn;

// adds = (n1: number, n2: number) => {
//   return n1 + n2;
// };

// interface Named {
//   readonly names?: string;
//   outputNames?: string;
//   greetOptional?(phrase: string): void;
// }

// interface Greetable extends Named {
//   greet(phrase: string): void;
// }

// // user={
// //   names:'Max',
// //   greet(phrase:string){
// //     console.log(phrase + " "+ this.name);
// //   }
// // }

// class People implements Greetable {
//   names?: string;

//   constructor(n?: string) {
//     this.names = n;
//   }
//   greet(phrase: string) {
//     console.log(phrase + " " + this.names);
//   }
// }
// let user: Greetable;
// user = new People("Hi There I am");
