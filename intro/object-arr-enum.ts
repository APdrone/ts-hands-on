enum Role {
  ADMIN = 0,
  READ_ONLY = "Auth",
  AUTHOR = 2,
}

const person = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};

if (person.role === Role.AUTHOR) {
  console.log("admin user");
}
