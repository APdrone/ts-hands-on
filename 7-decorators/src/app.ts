// function Logger(logString: string) {
//   console.log("LOGGER FACTORY");
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log(constructor);
//   };
// }

// function withTemplate(template: string, hookId: string) {
//   console.log("TEMPLATE FACTORY");
//   return function <T extends { new (...args: any[]): { name: string } }>(
//     originalConstructor: T
//   ) {
//     return class extends originalConstructor {
//       constructor(..._: any[]) {
//         super();
//         console.log("Rendering template");
//         const hookEl = document.getElementById(hookId);

//         if (hookEl) {
//           hookEl.innerHTML = template;
//           hookEl.querySelector("h1")!.textContent = this.name;
//         }
//       }
//     };
//   };
// }

// @Logger("LOGGING")
// @withTemplate("<h1>My Person Object</h1> ", "app")
// class Person {
//   name = "Max";
//   constructor() {
//     console.log("Creating person objects...");
//   }
// }

// const pers = new Person();

// console.log(pers);

// function Log(target: any, propertyName: string | Symbol) {
//   console.log("property decorator!");
//   console.log(target, propertyName);
// }

// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Accessor decorator!");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Accessor decorator!");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log4(target: any, name: string | Symbol, position: number) {
//   console.log("Parameter decorator!");
//   console.log(target);
//   console.log(name);
//   console.log(position);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) this._price = val;
//     else throw new Error("Invalid price- should be postitive!");
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }
//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }
console.log("first");

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  private message;

  constructor(m: string) {
    this.message = m;
  }
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer("This Works!");

console.log("p:: ", p);

const button = document.querySelector("button")!;

button.addEventListener("click", p.showMessage);

interface validatorConfig {
  [property: string]: {
    [ValidatableProp: string]: string[];
  };
}

const registeredValidatators: validatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidatators[target.constructor.name] = {
    ...registeredValidatators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidatators[target.constructor.name] = {
    ...registeredValidatators[target.constructor.name],
    [propName]: ["postitive"],
  };
}

function Validate(obj: any) {
  console.log("registeredValidatators", registeredValidatators);
  const objValidatorConfig = registeredValidatators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "postitive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!Validate(createdCourse)) {
    alert("invalid input");
    return;
  }
  console.log(createdCourse);
});
