// class Departments {
//   // private name: string;
//   static fiscalYear = 2020;
//   // public readonly id: string="constants";
//   protected employees: String[] = [];
//   // constructor(n: string) {
//   //   this.name = n;
//   // }
//   constructor(public name: string, private readonly id: string) {}

//   describe(this: Departments) {
//     console.log(`Department(${this.id}): ${this.name}`);
//   }
//   addEmployee(employee: string) {
//     this.employees.push(employee);
//   }
//   printEmployeeInfo() {
//     console.log('team size', this.employees.length);
//     console.log('employee list', this.employees);
//   }
//   static createEmployee(name: string) {
//     return name;
//   }
// }

// class ITDepartments extends Departments {
//   private lastReport: string;

//   get getMostLatesReport() {
//     console.log(this.lastReport);
//     return this.lastReport;
//   }
//   set mostRecentreport(val: string) {
//     this;
//   }
//   constructor(id: string, private reports: string[]) {
//     super(id, 'IT');
//     this.lastReport = reports[0];
//   }
//   addEmployee(name: string): void {
//     if (name === 'Max') {
//       return;
//     }
//     this.employees.push(name);
//   }
// }

// abstract class UserDept {
//   abstract describe(this: Departments): void;
//   abstract describe2(this: Departments): void;
// }

// class userExtendsDept extends UserDept {
//   describe(this: Departments): void {
//     console.log('first');
//   }
//   describe2(this: Departments): void {
//     console.log('set');
//   }
// }

// const Account = new Departments('Accounting', 'ACC');
// Account.addEmployee('Max');
// Account.addEmployee('Manu');

// console.log(Account);
// Account.describe();
// Account.printEmployeeInfo();

// const itDept = new ITDepartments('ITDepartment', ['Max']);

// console.log(itDept);

// itDept.getMostLatesReport;

// class Singletonn extends Departments {
//   private lastReport: string;
//   private static instance: Singletonn;
//   private constructor(id: string, private reports: string[]) {
//     super(id, 'Account');
//     this.lastReport = reports[0];
//   }
//   static getInstance() {
//     if (Singletonn.instance) {
//       return this.instance;
//     }
//     this.instance = new Singletonn('it', ['today']);
//     return this.instance;
//   }
// }

// interface Person {
//   names: string;
//   age: number;
//   greet(phrase: string): void;
// }

// let usr: Person;

// usr = {
//   names: 'Max',
//   age: 30,
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name);
//   },
// };

// type AddFns = (a: number, b: number) => number;

// let addd: AddFns;

// adds = (n1: number, n2: number) => {
//   return n1 + n2;
// };
