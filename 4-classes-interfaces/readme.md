# Object Oriented Programming(OOPS)

objects are concreate, the things we work in the code. it is instance of class. class based creation is an alternative to using object literals

classes blueprint for objects. classes make creation of multiple similar objects much easier

# creating first class

for defining class, we use "class" keyword and we can define a property(without const or let) and constructor

```ts
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Department('Accounting');

console.log(accounting);
```

# constructor function and this keyword

we can define method as well in the class, and we can access the class
properties using "this" keyword

```ts
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
  describe() {
    //using this keyword
    console.log('Department: ' + this.name);
  }
}

const account = new Department('Accounting');
account.describe(); //Accounting
```

if we assign the "descibe()" method of the "accounts" object to another one "AccountCopy"

```ts
const account = new Departments('Accounting');
account.describe(); //Accounting

const accountCopy = { describe: account.describe };
accountCopy.describe(); //undefined
```

we get undefined as "this" refers to "AccountCopy" now and "AccountCopy" doesn have "name" property

```ts

 describe() {
    console.log("Department: " + this.name);
  }

```

we can resolve it by adding "this" parameter and having it as type of the class "Department" , which means after this we can only pass instance of "Department" class there. this is the type safety we can have

```ts

 describe(this:Department) {
    console.log("Department: " + this.name);
  }

```

and moment we add this code we will get error in this line

```ts

Property 'name' is missing in type '{ describe: (this: Departments) => void; }' but required in type 'Departments'

accountCopy.describe();

```

we need to have "name" property as well in that object to resolve this , as TS expects the instance should have property "name" and method "describe()".

```ts
//added "name" property

const accountCopy = { name: 'test', describe: account.describe };
accountCopy.describe();
```

# private and public access modifier

```ts
class Departments {
  name: string;
  employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }
  describe(this: Departments) {
    console.log('Department: ' + this.name);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const account = new Departments('Accounting');
account.addEmployee('Max');
account.addEmployee('Manu');

account.printEmployeeInformation();
```

we can add Employees using "addEmployee()" method
but also we add "employee by accessing and updating the "employees" array direclty

```ts
account.employees.push('Anna');

// or

accounting.employees[2] = 'Anna';
```

and we need to ensure we should only have one way to accesing/adding those values. so resolve this ,
we can use access modifiers "private" modifier in variables and methods. "public" modifier is by default

```ts
private employees: string[] = [];

```

by doing this we will now get error on below line

```ts
accounting.employees[2] = 'Anna';
```

```ts

```

# shorthand initialization

instead of defining variables ie id two times, once during declaration and then next in constructor signature like this

```ts
class Department {
  public name: string;
  private id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
```

instead we can write as in single shot while creating constructor:
define signature with access modifiers and "public" is necessary here to be defined.

```ts
class Department {
  // public name:string;
  // private id:string;
  constructor(public name: string, private id: string) {}
}
```

# readonly properties

once property set with "readonly" then TS doesnt allow to update the property , we can do it once during initialization in constructor but not after that

variables can be defined as

```ts

public readonly id: string;

```

OR in the constructor

```ts
class Departments {
  // private readonly id:string;
  // public name:string
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  describe(this: Departments) {
    console.log(`Department(${this.id}): ${this.name}`);
  }
  addEmployee(employee: string) {
    //as id is set "readonly"
    this.id = '42'; //will throw error
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
```

# inheritance:

lets say we need IT deparment which will have all the base methods there in the "Department" class and additioanl specific to this class

we can extend using "Department" class and we can inialise this with our base class, subclass will use the constructor of base class by default

```ts
//Base class

class Departments {
  // private readonly id:string;
  // public name:string
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}
  describe(this: Departments) {
    console.log(`Department(${this.id}): ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
```

```ts
//subclass

class ITDepartments extends Departments {}

const account = new ITDepartments('d1', 'Accounting');

account.describe(); //Department(d1): Accounting
account.addEmployee('Max');
account.addEmployee('Manu');

account.printEmployeeInformation();
```

also we can have subclass specific constructor, and first line hsould be calling base class constructor using "super"

arguments passed to super() will be passed to base class constructor

```ts
class ITDepartments extends Departments {
  constructor(id: string) {
    //har-codinng department to "IT"
    super(id, 'IT');
  }
}
const account = new ITDepartments('d1');
```

also we added additional property for subclass constructor , we can either define it directly in constructor signature or seaprately declare and use in constructor

> option1: to use directly in constructor

```ts
class ITDepartments extends Departments {
  constructor(id: string, public admins: string[]) {
    //har-codinng department to "IT"
    super(id, 'IT');
  }
}

const account = new ITDepartments('d1');
```

> option 2: to declare and use in constructor

```ts
class ITDepartments extends Departments {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

const it = new ITDepartments('d1', ['Max']);
it.describe();
it.addEmployee('Max');
it.addEmployee('Manu');

it.printEmployeeInformation();

console.log(it);
```

Similarly we can another subclass "AccountDepartment"

```ts
class AccountDepartment extends Departments {
  constructor(id: string, private reports: string[]) {
    super(id, 'Account');
  }
  addReports(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }
}

const account = new AccountDepartment('d1', []);

account.addReports('Something went wrong');

account.printReports(); //['Something went wrong']
```

# overriding proerties and the protected modifier

Also we can also override the methods of base class,

we can override method "addEmployee" but problem is we wont be able to access the "employee" property as it is marked as private in base class

```ts
//main class

class Departments {
  private employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}
  describe(this: Departments) {
    console.log(`Department(${this.id}): ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

//sub class

class AccountDepartment extends Departments {
  constructor(id: string, private reports: string[]) {
    super(id, 'Account');
  }
  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    //Property 'employees' is private and only accessible within class 'Departments'
    this.employees.push(name); // will throw error
  }
  addReports(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }
}
```

so to avoid it we can change access modifier to "protected" in base (Department) class

```ts

  // private employees: string[] = [];
  protected employees: string[] = [];

```

# Getters and Setters

we have getters and setters to access private fields

```ts
class AccountDepartment extends Departments {
  //added private variable
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    } else {
      throw new Error('No report found,');
    }
  }
  constructor(id: string, private reports: string[]) {
    super(id, 'Account');
    this.lastReport = reports[0];
  }
  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    //Property 'employees' is private and only accessible within class 'Departments'
    this.employees.push(name);
  }
  addReports(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}
```

if we access it direclty we will get error

```ts
const account = new AccountDepartment('d1', []);

// Property 'lastReport' is private and only accessible within class 'AccountDepartment'

account.lastReport; //will throw above error
```

to resolve this we can use create getter method, we use with keyword "get" and access it not as a method but as a property

in the "AccountDepartment" class we can use getter(where we can use additional logic for the value before returning)

```js

  get mostRecentReport(){
    if(this.lastReport){
      return this.lastReport;
    }else{
      throw new Error('No report found,')
    }



```

we will access the getter method as property

```ts
const account = new AccountDepartment('d1', []);

account.mostRecentReport;

//to print the value

console.log(account.mostRecentReport);
```

similar to getter, for setter we use "set" keyword and assign it the value rather than calling it with that value

we can use the same name as getter method :

```ts
set mostRecentReport(value:string){
    if(!value){
      throw new Error('Please pass in a valid value!')
    }
    this.addReports(value);
  }

```

and we can access it like

```ts
const account = new AccountDepartment('d1', []);

account.mostRecentReport = '';
```

Final code is

```ts
class AccountDepartment extends Departments {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    } else {
      throw new Error('No report found,');
    }
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReports(value);
  }
  constructor(id: string, private reports: string[]) {
    super(id, 'Account');
    this.lastReport = reports[0];
  }
  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    //Property 'employees' is private and only accessible within class 'Departments'
    this.employees.push(name);
  }
  addReports(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}

const account = new AccountDepartment('d1', []);

account.addReports('Something went wrong');

account.printReports();

account.mostRecentReport = 'Year end report';

console.log(account.mostRecentReport);
```

# Static methods and properties

used for utilities eg Math.PI or Math.pow() which we access on class not on instances

we can create static method or property by adding "static" keyword in the Department class

```ts
  static createEmployee(name: string) {
    return { name: name };
  }

  static fiscalYear=2020;

```

and we can access it without creating object(without creating intances) and using class name

```ts
const employee = Departments.createEmployee;

console.log(employee);
```

Also keep in mind , we cannot accesses static properties/variables from non static part of the class. we cant access like

```ts

  constructor(private readonly id: string, public name: string) {
    this.fiscalYear;
  }

```

> Full code:

```ts
class Departments {
  //static property
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  //static method
  static createEmployee(name: string) {
    return { name: name };
  }
}

const employee = Departments.createEmployee('Max');

console.log(employee, Departments.fiscalYear);
```

# Abstract classes

sometimes we want to enforce certain methods, and used when we want methods to be available in all inherited classes but leave the implementation to specific classes

we use "abstract" keyword in the method and no body and just return type ie number, boolean void etc

```ts
 abstract describe(this: Departments):void ;

```

and then we need to add this keyword in the class as only abstract class can have abstract method

> if a class has abstract method , class should be defined as abstract

```ts
abstract class Departments {}
```

> if a class extending abstract class then it should define implement all its methods or define itself as abstract

> it is useful, if we want to enforce all classes share some common method/properties. also we dont need to implement
> concreate implementation in the base class

> we cannot instantiate the abstract class. it is just a class to be inherited from

> Full code

```ts
//made class abstract
abstract class Departments {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  // made abstract method
  abstract describe(this: Departments): void;
}

//inherited class
class ITDepartments extends Departments {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
  // need to implement abstract method in inherited class
  describe() {
    console.log('IT deaprtment- ID' + this.id);
  }
}

//inherited class
class AccountDepartment extends Departments {
  private lastReport: string;

  constructor(id: string, private reports: string[]) {
    super(id, 'Account');
    this.lastReport = reports[0];
  }
  // need to implement abstract method in inherited class
  describe() {
    console.log('Accounting department - ID: ' + this.id);
  }
}
```

# singleton and private constructors

singleton is used to ensure only there is one instance of certain classes.

we will make constructor as private so cannot be accessed from outside class, and now it can only be accessed inside the class

```ts

private constructor(id: string, private reports: string[]) {
    super(id, "Account");
    this.lastReport = reports[0];
  }

// now we will get error on calling new keyword on this class
/*
Constructor of class 'AccountDepartment' is private and only accessible within the class declaration.
*/
const account = new AccountDepartment("d1", []);

```

As we cant access the constructor from outside , we will create static method "getinstance" as static can be accessed from outside.

```ts
static getInstance(){

}
```

now we can check whether intance alreay exist or not before creating new one. we will declare static variable of type "AccountDeparment" class and also keep it private

```ts

 private static instance:AccountDepartment;

  static getInstance(){
  if (AccountDepartment.instance) {
    return this.instance;
  }
  this.instance=new AccountDepartment('d2',[]);
  return this.instance;
}

// then we can call static instance method from outside
const account =  AccountDepartment.getInstance();

```

Full code

```ts
class AccountDepartment extends Departments {
  private lastReport: string;
  private static instance: AccountDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, 'Account');
    this.lastReport = reports[0];
  }
  static getInstance() {
    if (AccountDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountDepartment('d2', []);
    return this.instance;
  }
}

// const account = new AccountDepartment("d1", []);
const account = AccountDepartment.getInstance();
```

# interfaces:

interface describes the structure of the object, we can use it to describe how an object should look like.

```ts
interface Person {
  names: string;
  age: number;
  greet(phrase: string): void;
}
```

> we will get error if we try to intialise the values there "An interface property cannot have an initializer."

```ts
interface Person{
  //below line will throw error
  names:string ="Max;
  age:number;
  greet(phrase:string):void;
}
```

> we can define just the structure of variables and methods and once defined , we can assign the interface type and can use it

let user1: Person;

```ts
let user: Person;

user = {
  names: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  },
};

user.greet('Hi there - I am ');
```

# using interfaces with classes

we can also use "types" to describe the same "Person" object instead of interface ie

```ts

//from
interface Person{
  names:string;
  age:number;
  greet(phrase:string):void;
}

to

type Person{
  names:string;
  age:number;
  greet(phrase:string):void;
}

```

usually we define "object" types with interfaces.while we can use "type" for object and others so it is more flexible.

Interface is contract a class can implement and then class has to adhere to .

```ts
interface Greetable {
  names: string;
  greet(phrase: string): void;
}

//  we get error if dont implement it
class People implements Greetable {}
```

```ts
// implemented interface
class People implements Greetable {
  names: string;

  constructor(n: string) {
    this.names = n;
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.names);
  }
}
```

> class can implement multiple interfaces but only can extend single class

> once we implement a interface we need to implement interface variable and method

> we use interface to share common functionality among classes
> Full code

```ts
interface Greetable {
  names: string;
  greet(phrase: string): void;
}

class People implements Greetable {
  names: string;

  constructor(n: string) {
    this.names = n;
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.names);
  }
}
let user: Greetable;
user = new People('Hi There I am');
```

# why interfaces

when we want certain set of functiobality ie some method. we want to ensure a class has that particular method.then we can implement
a interface which forces the class to have that method.

once we define a type as of created "interface" then we want the variable to hold the methods/variables defined in the interface.

# readonly interface properties

> we can add "readonly" within interface but not "public" and "private". the value then can only be set once and then read only afterwards

```ts
interface Greetable {
  readonly names: string;
  greet(phrase: string): void;
}

//will be set once only by constructor and then cant be changed

class People implements Greetable {
  names: string;

  constructor(n: string) {
    this.names = n;
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.names);
  }
}

let user: Greetable;
user = new People('Hi There I am');

/* Cannot assign to 'names' because it is a read-only property. */
user.names = 'Max';
```

# extends interfaces

> we can combine interfaces using "extends" keyword

```ts
interface Named {
  readonly names: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class People implements Greetable {
  names: string;

  constructor(n: string) {
    this.names = n;
  }
  greet(phrase: string) {
    console.log(phrase + ' ' + this.names);
  }
}
```

> and also we will get flexibilty to use two interfaces , depending on need the class can use these

```ts
interface Named {
  readonly names: string;
}
interface AntotherInterface {
  readonly random: string;
}

interface Greetable extends Named, AntotherInterface {
  greet(phrase: string): void;
}
```

# interfaces as function types

So far we learned we can use interface to define object type but can also be used as replacement of "function" type

we learned function type as

```ts
type AddFunc = (a: number, b: number) => number;

let adds: AddFunc;

adds = (n1: number, n2: number) => {
  return n1 + n2;
};
```

instead we can interface and define it as anoymous function

```ts
// previously we defined a function as

interface Greetable {
  greet(phrase: string): void;
}

// similarly we can define the function type as
interface AddFn {
  (a: number, b: number): number;
}
```

and then it would work similar like for function type

```ts
interface AddFn {
  (a: number, b: number): number;
}

let adds: AddFn;

adds = (n1: number, n2: number) => {
  return n1 + n2;
};
```

# optional parameters and properties

we can add optional methods and properties in interface using "?"

```ts
interface Named {
  readonly names: string;
  outputNames?: string;
  greetOptional?(phrase: string): void;
}
```

# compiling interfaces to JS

there is no translation for interfaces in JS, no translation will come in JS file for it like we had for classes, and other TS features
