abstract class Department {
  //   public name: string;
  // private employees: string[] = [];
  protected employees: string[] = [];

  static fiscalYear = 2020;

  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  // describe(this: Department) {
  //   console.log(`Department (${this.id}): ${this.name}`);
  // }
  abstract describe(): void;

  addEmployee(employee: string) {
    // this.id="d2"
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// const accounting = new Department("d", "Accounting");

// accounting.describe();
// accounting.addEmployee("Max");
// accounting.addEmployee("Manu");

// // accounting.employees[2] = "Anna";

// accounting.printEmployeeInformation();

//we will get methods, variables and constructor , also we can add own constructor
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
  describe() {
    console.log("IT department", this.id);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d", ["Max"]);

it.describe();
it.addEmployee("Max");
it.addEmployee("Manu");
it.printEmployeeInformation();

console.log(it);

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;

    throw new Error("No Report found !");
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("Please pass in a valid value!");
    this.addReport(value);
  }

  private constructor(id: string, public reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
  describe() {
    console.log("Accounting department", this.id);
  }
}

// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance();

//to use setter
// accounting.mostRecentReport = "";
accounting.mostRecentReport = "Year End report";
accounting.addReport("Something went wrong...");

//we access getter method as a property
console.log(accounting.mostRecentReport);

accounting.printReports();

accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.printEmployeeInformation();
