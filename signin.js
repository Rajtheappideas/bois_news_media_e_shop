function one(name, age, gender) {
  const obj = {
    name,
    age,
    gender,
    details: function () {
      console.log(this);
    },
  };
  return obj.details();
}

// const two = one;
// two("raj", 22, "male");

function SetUsername(username, email, password) {
  this.username = username;
  this.email = email;
  this.password = password;
}

function createUser(username, email, password) {
  SetUsername.call(this, username, email, password);
}

// const chai = new createUser("chai", "chai@fb.com", 123);
// console.log(chai);

// class User {
//   constructor(username, email, password) {
//     this.username = username;
//     this.email = email;
//     this.password = password;
//   }
//   encryptPassword() {
//     return `${this.password}abc`;
//   }

//   upperCase() {
//     return `${this.username.toUpperCase()}`;
//   }
// }

function User1(username, email, password) {
  this.username = username;
  this.email = email;
  this.password = password;
}

User1.prototype.encryptPassword = function () {
  return `${this.password}abc`;
};

// ----------------------------inheritence-----------------
// class User {
//   constructor(username) {
//     this.username = username;
//   }
//   logME() {
//     console.log(this);
//     return console.log(`username is ${this.username}`);
//   }
// }

// class Teacher extends User {
//   constructor(username, email, password) {
//     super(username);
//     this.email = email;
//     this.password = password;
//   }

//   addCourse() {
//     return console.log(`A new course was added by ${this.username}`);
//   }

//   giveMePassword() {
//     return console.log(`password is "${this.password}"`);
//   }

//   removePassword() {
//     this.password = "";
//     return console.log("password was removed", this.password);
//   }
// }

// const chai = new Teacher("chai", "chai@gmail.com", 123);
// const tea = new User("tea");
// tea.logME();
// console.log(tea instanceof User);

// chai.addCourse();
// chai.giveMePassword();
// chai.removePassword();

//-----------------------------------static========================
// class User {
//   constructor(username) {
//     this.username = username;
//   }
//   logME() {
//     return console.log(`username is ${this.username}`);
//   }
//   static createID() {
//     return Math.ceil(Math.random() * 10 + 123);
//   }
// }

// const descriptor = Object.getOwnPropertyDescriptor(Math, "PI");
// console.log(descriptor);

// const chai = {
//   name: "normal chai",
//   price: 20,
// };

// Object.defineProperties(chai, {
//   name: { enumerable: true, writable: false },
//   price: { enumerable: true },
// });
// chai.name = "asdasdasd";
// const descriptor = Object.getOwnPropertyDescriptor(chai, "name");

// for (const [key, value] of Object.entries(chai)) {
//   // console.log(key, value);
// }

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  get password() {
    return this._password.toUpperCase();
  }
  set password(value) {
    this._password = value;
  }

  get email() {
    return this._email.toUpperCase();
  }
  set email(value) {
    this._email = value;
  }
}

// const user = new User("raj@gmail.com", "abv");

// user.email = "new@gmail.com";
// console.log(user.email);

function outer() {
  function inner() {
    return console.log("inner", name);
  }
  const name = "raj";
  inner();
}

// outer();

const arr = [23, 2, 4, 55, 0, 4, 2];
const changedArr = arr.slice(-4, -2);

console.log(arr);
console.log(changedArr);
