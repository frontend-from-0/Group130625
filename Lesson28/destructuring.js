// Arrays 
// Basic Example
const numbers = ['hello', null, true, undefined, function () {console.log(hello);}];

// Without destructuring
// const first = numbers[0];
// const second = numbers[1];
// const third = numbers[2];
// const fourth = numbers[3];


// With destructuring
// const [first, second, third, fourth, fifth] = numbers;


// Skipping Elements
// const [first, , , fourth] = [0, 0, 0];



// Using Rest Parameters to Capture the Rest of the Elements
// const [first, second, ...remaningElementsArray] = numbers;
// console.log(first, second, remaningElementsArray);

// function useState () {

//   const state = 'Some state';
//   const setState = (newState) => {
//     console.log('State updated:', newState);
//   };

//   return [state, setState];
// }

// const [count, setCount] = useState();
// const [timer, setTimer] = useState();



// Default Values
// const numbersForDefaultValuesExample = [1];
// const [a = 10, b = 20] = numbersForDefaultValuesExample;

// console.log(a); // 1
// console.log(b); // 20


// Objects
// Basic Usage

const person = {
  name: 'Alice',
  age: 30,
  job: 'Engineer',
  isStudent: true
};

// Without destructuring
// const name = person.name;
// const age = person.age;

// With destructuring
// const { age, name } = person;


// console.log(name); // Alice
// console.log(age);  // 30

// Renaming Variables
// const { age: personAge, name } = person;
// const personAge = person.age;
// const name = person.name;


// console.log(name); // Alice
// console.log(personAge);  // 30


// Default Values
// const { name: anotherPersonName = 'John Doe', isStudent = false } = person;

// console.log(anotherPersonName); // Alice
// console.log(isStudent);  // true

// Nested Objects

const personWithContactInfo = {
  name: 'Dave',
  age: 32,
  contact: {
    email: 'dave@example.com',
    phone: '123456789',
    address: {
      line1: "Kungstagatan 1",
      postcode: '444222'
    }
  }
};

const { 
  name: firstName,
  contact: { email, phone, address: {line1, postcode: postalCode} } 
} = personWithContactInfo;

// console.log(firstName); // Dave
// console.log(email); // dave@example.com
// console.log(phone); // 123456789
// console.log(line1); // Kungstagatan 1
// console.log(postalCode); // 444222



// Rest Properties
const { name: nameForRestExample, age: ageForRestExample, ...rest } = personWithContactInfo;
console.log(nameForRestExample);
console.log(ageForRestExample);
console.log(rest);

// In JS, ... is called 'rest operator'



