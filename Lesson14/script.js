let name = 'John';
console.log('The name is:', name, 'Type of name is:', typeof name);

let surname = 'Doe';
let phone = '+931234567';

let johnDoe = {
  name: 'John',
  surname: 'Doe',
  age: 28,
  address: {
    line1: 'Kungsgatan 3',
    line2: '24',
    city: 'Gothenburg',
    postalCode: '123 09',
  },
};

console.log(johnDoe);

console.log(typeof johnDoe, Array.isArray(johnDoe));

const contactBook = [
  johnDoe,
  {
    name: 'Jane',
    surname: 'Doe',
    age: 32,
    address: {
      line1: 'Kungsgatan 3',
      line2: '20',
      city: 'Gothenburg',
      postalCode: '123 09',
    },
  },
];

console.log(typeof contactBook, Array.isArray(contactBook));

// This is a single line comment

/* 
This
is a
multi
line 
comment
 */

/* const userResponse = prompt('What is your age?');

console.log('The user\'s age is:', userResponse); */

name = 'Mary';
console.log('The name is:', name, 'Type of name is:', typeof name);

name = null;
console.log('The name is:', name, 'Type of name is:', typeof name);

name = false;
console.log('The name is:', name, 'Type of name is:', typeof name);


let thisPhone = '+90 123 456 12 34';
console.log('This phone is: ', thisPhone);
thisPhone = '+90 000 000 12 34';

console.log('This phone is: ', thisPhone);
