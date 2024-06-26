// const names: Array<string> = ["Max", "Mani"];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("this is done!");
//   }, 2000);
// });

// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return { ...objA, ...objB };
// }

// console.log(merge({ name: "Max" }, { age: 30 }));

// const mergedObj = merge({ name: "Max" }, { age: 30 });

// console.log(mergedObj.age);

// interface Lengthy {
//   length: number;
// }

// function CountAndDescribe<T extends Lengthy>(element: T):[T,string] {
//   let descriptionText = "Got no value";
//   if (element.length === 1) {
//     descriptionText = "Got 1 element.";
//   } else if (element.length > 1) {
//     descriptionText = "Got " + element.length + " elements.";
//   }
//   return [element, descriptionText];
// }

// console.log(CountAndDescribe("Hi there!"));

// function extractAndConvert<T extends object,U extends keyof T>(obj:T, key:U){
//     return 'Value: '+obj[key];
// }

// extractAndConvert({name:'Max'},'name');

// class DataStorage<T extends string | number> {
//   private data: T[] = [];

//   addItem(item: T) {
//     this.data.push(item);
//   }
//   removeItem(item: T) {
//     if (this.data.indexOf(item) === -1) {
//       return;
//     }
//     this.data.splice(this.data.indexOf(item), 1);
//   }
//   getItems() {
//     return [...this.data];
//   }
// }

// const textStorage = new DataStorage<string>();

// textStorage.addItem("Max");
// textStorage.addItem("Manu");
// textStorage.removeItem("Max");
// console.log(textStorage.getItems());

// const numberStorage = new DataStorage<number | string>();

// const objStorage = new DataStorage<object>();

// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });

// objStorage.removeItem({ name: "Max" });

// console.log(objStorage.getItems());

// interface CourseGoal {
//   title: string;
//   description: string;
//   completeUntil: Date;
// }

// function createCourseGoal(
//   title: string,
//   description: string,
//   date: Date
// ): CourseGoal {
//   let courseGoal: Partial<CourseGoal> = {};
//   courseGoal.title = title;
//   courseGoal.description = description;
//   courseGoal.completeUntil = date;
//   return courseGoal as CourseGoal;
// }

// const names:Readonly<string[]>=['Max','Anna'];

// names.push('Manu');
