# intersection types

we can have intersection of two objects types, it will have combination of two.

```ts
type Admin = {
  name: string;
  privileges: String[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const el: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};
```

Also we can intersection of two primitives, whereas in primitives it will the intersection of two(common of two)

```ts
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
```

# more on Type Guards

descibes the idea/approach of checking whether some property or method exist before you try to use it.

we can have multiple ways of type guard

1.  type guard using "typeof"

```ts
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

2. typeguard using "in" keyword

```ts
type Admin = {
  name: string;
  privileges: String[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  //below line will throw  error as if unknownEmployee is Admin then it wont have this "privilege" property
  console.log('Name: ' + emp.privileges);
}
```

to resolve it we cant use typeof

```ts
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);

  //not a valid type 'Employee'
  if (typeof emp === 'Employee') {
    console.log('Name: ' + emp.privileges);
  }
}
```

also TS wont allow to access TS property

```ts
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);

  // TS wont allow access property like this
  if (emp.privileges) {
    console.log('privileges: ' + emp.privileges);
  }
}
```

but we can use "in" keyword of JS

```ts
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('privileges: ' + emp.privileges);
  }
}
```

similarly we can add for "StartDate"

```ts
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('startDate: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);

printEmployeeInformation({ name: 'Max', startDate: new Date() });
```

3. typeguard using "instanceof" when working with classes

we have two clasess 'Car' and 'Truck'

```ts
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();
```

now if we create function "useVehicle" we get error on accessing method "loadCargo" without typeguard

```ts
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //again we will get error in this line as vehicle wont have "loadCargo" method if "vehicle" is instance of "Car"
  vehicle.loadCargo(1000);
}
```

one way is to use the same "in" keyword

```ts
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if ('loadCargo' in vehicle) {
    vehicle.loadCargo(1000);
  }
}
```

but we can also use "instanceof"

```ts
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}
```

# Discriminated Unions

it is pattern we can use when working with union types or objects and helps implementing typeguards better

lets say we have two interfaces

```ts
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}
type Animal = Bird | Horse;
```

aand again we will get error on accessing these values without typeguard

```ts
function moveAnimal(animal: Animal) {
  //both lines will give errors
  console.log('Moving with speed' + animal.flyingSpeed);
  console.log('Moving with speed' + animal.runningSpeed);
}
```

to resolve it we can "type" in all interfaces and then use it in the function

```ts
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving at speed:' + speed);
}

moveAnimal({ type: 'horse', runningSpeed: 10 });
```

# TypeCasting

to tell TS that certain values are of specific type and where TS not able to ascertain the type

lets say we have paragraph element in html

```html
<body>
  <p>test para</p>
</body>
```

we can use js to get that element , and TS will be able to deduce the type of it , it deduce it is type "HTMLParagraphElement"

```ts
// const paragraph: HTMLParagraphElement | null
const paragraph = document.querySelector('p');
```

but if we add "id" to html and try to find it, it will consider it just as "html element" as TS not looking into our html files

```html
<body>
  <p id="message-output">test para</p>
</body>
```

```ts
// const paragraph2: HTMLElement | null
const paragraph = document.getElementById('message-output');
```

similarly for input element if queried using "id"

```html
<body>
  <p id="message-output">test para</p>
  <input type="text" id="user-input" />
</body>
```

then we queried and tried to set value we will get error as TS consider the input just as any HTML element

```ts

const userInputElement = document.getElementById("user-input")!;

//Property 'value' does not exist on type 'HTMLElement'.
userInputElement.value=' Hi there!'

note:
we used "!" in the below line to tell TS that this expression will never yield null, but if you are not sure whether this can yeild null as well we can use "if" block

const userInputElement = document.getElementById("user-input")!;



```

So, to overcome this we can have two ways of typecasting

1. we are able to use "HTMLInputElement" as we can included the "dom" library in the tsconfig.json file

```ts
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

userInputElement.value = ' Hi there!';
```

2. above approach may give error eg for React as we use similarly angle bracket syntax in React, we can use "as" instead

```ts
const userInputElement = (<HTMLInputElement>document.getElementById('user-input')!) as HTMLInputElement;

userInputElement.value = ' Hi there!';
```

# index properties

index types, a feature that allows us to create objects which are flexible about the values they hold eg they are input elements of different types, and eventually store or show different error based on type of input

also we can define other property but for same type in "ErrorContainer"

we cab say I dont know the exact property name , neither know the count of properties eg username, pass, id etec. I just know every property added to this object ErrorContainer, must have property as string and value of that property also must be string

Also in addition we can define other pre-define properties.but it needs to be simple type like we defined

[prop: string]: string;

then other properties we are adding should be of type string

id:string

```ts
//we defined key and value  having string
interface ErrorContainer {
  //valid
  id: string;
  //invalid: Property 'id' of type 'number' is not assignable to 'string' index type 'string'
  id: number;
  [prop: string]: string;
}

//using it we can define multiple values without care about the individual values,
const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character',
};
```

# function overloads

feature that allows us to define multiple function signature
for the same function

```ts
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//when hover over the add fn we get return type as Combinable means either string or number
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

as a consequence of it, we cant apply string methods to "result" we get, as it can be a number as well, similar issue we saw in type casting

```ts
/**
 * Property 'split' does not exist on type 'string | number'.
  Property 'split' does not exist on type 'number'
*/
const result = add('Max', 'Schwarz');
result.split(' ');
```

one way is to resolve it using typecasting

```ts
const result = add('Max', 'Schwarz') as string;
result.split(' ');
```

another way is to use function overload, we define it above the actual function

```ts
function add(a: number, b: number): number;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

we can also have overload using single or different combination ie nuber and string or string or number, number or number

```ts
function add(n: number): number;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

# optional chaining

it is similar to have in JS

```ts
const fetchedUserData = {
  id: 'ul',
  name: 'Max',
  job: { title: 'CEO', description: 'my own company' },
};

console.log(fetchedUserData?.job?.title);
```

# null coalescing operator

similar to JS, helps to handle nullish values, it consider null and undefined as falsy values

```ts
const userInput = '';

const storedData = userInput || 'DEFAULT';

console.log(storedData);
```
