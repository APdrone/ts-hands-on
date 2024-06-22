// type Admin = {
//   name: string;
//   privileges: String[];
// };

// type Employee = {
//   name: string;
//   startDate: Date;
// };

// type ElevatedEmployee = Admin & Employee;

// const e1: ElevatedEmployee = {
//   name: "Max",
//   privileges: ["create-server"],
//   startDate: new Date(),
// };

// type Combinable = string | number;
// type Numeric = number | boolean;

// type Universal = Combinable & Numeric;

// function add(a: Combinable, b: Combinable) {
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log("Name: " + emp.name);
//   if ("privileges" in emp) {
//     console.log("Name: " + emp.privileges);
//   }
//   if ("startDate" in emp) {
//     console.log("Name: " + emp.startDate);
//   }
// }

// printEmployeeInformation({ name: "Max", startDate: new Date() });

// class Car {
//   drive() {
//     console.log("Driving...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("Driving a truck...");
//   }
//   loadCargo(amount: number) {
//     console.log("Loading cargo..." + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }
// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log("Moving at speed:" + speed);
// }

// moveAnimal({ type: "horse", runningSpeed: 10 });

// const paragraph = document.querySelector("p");

// const paragraph2 = document.getElementById("message-output");

// const userInputElement = (<HTMLInputElement>(
//   document.getElementById("user-input")!
// )) as HTMLInputElement;

// userInputElement.value = " Hi there!";

// interface ErrorContainer{
//   [prop:string]: string;
// }

// const errorBag:ErrorContainer={
//   email:'Not a valid email!',
//   username:'Must start with a capital character'
// }

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("Max", "Schwarz");
result.split("");

const fetchedUserData = {
  id: "ul",
  name: "Max",
  job: { title: "CEO", description: "my own company" },
};

console.log(fetchedUserData?.job?.title);

const userInput = "";

const storedData = userInput || "DEFAULT";

console.log(storedData);
