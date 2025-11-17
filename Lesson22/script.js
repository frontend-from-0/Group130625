const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+?\d(?:\s?\d){9,19}$/;
const onlyLetters = /^[a-zA-Z\s-]+$/;
const cardPattern = /^(\d{4}\s){3}\d{4}$/;
const expDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
/* 
- What are required input fields? - all fields are required here
- Select elements in JS
- trigger validation on form submit
- trigger validation on input change or on blur
*/

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');

const firstNameInput = document.getElementById('firstname');
const firstNameError = document.getElementById('firstNameError');
const lastNameInput = document.getElementById('lastname');
const lastNameError = document.getElementById('lastNameError');
const cardInput = document.getElementById('cardNumber');
const cardNumberError = document.getElementById('cardNumberError');

const expDate = document.getElementById('expDate');
const expDateError = document.getElementById('expDateError');

let formValid = true;

function validateEmail(email) {
  if (!emailPattern.test(email)) {
    emailError.innerText =
      'Please enter email address in the correct format (e.g. name@gmail.com)';
    emailError.classList.remove('hidden');
    formValid = false;
  } else {
    emailError.innerText = '';
    emailError.classList.add('hidden');
  }
}

function validatePhone(phone) {
  if (!phonePattern.test(phone)) {
    phoneError.innerText =
      'Please enter phone in the following format: +90 123 456 7890';
    phoneError.classList.remove('hidden');
    formValid = false;
  } else {
    phoneError.innerText = '';
    phoneError.classList.add('hidden');
  }
}

function validateName(name, nameError) {
  if (!onlyLetters.test(name)) {
    nameError.innerText = 'Only letters, whitespaces and - are allowed.';
    nameError.classList.remove('hidden');
    formValid = false;
  } else if (!(name.trim().length > 0)) {
    nameError.classList.remove('hidden');
    nameError.innerText = 'Enter more than one character.';
    formValid = false;
  } else {
    nameError.innerText = '';
    nameError.classList.add('hidden');
  }
}

function validateCard(number) {
  if (!cardPattern.test(number)) {
    cardNumberError.innerText =
      'Please enter card number in the following format: 1234 5678 9101 1121';
    cardNumberError.classList.remove('hidden');
    formValid = false;
  } else {
    cardNumberError.innerText = '';
    cardNumberError.classList.add('hidden');
  }
}

function validateExpDate(date) {
  if (!expDatePattern.test(date)) {
    expDateError.innerText =
      'Please enter a expiration date in the following format: MM/YY';
    expDateError.classList.remove('hidden');
    formValid = false;
  } else {
    expDateError.innerText = '';
    expDateError.classList.add('hidden');
  }
}

emailInput.addEventListener('input', () => validateEmail(emailInput.value));
phoneInput.addEventListener('input', () => validatePhone(phoneInput.value));
firstNameInput.addEventListener('input', () =>
  validateName(firstNameInput.value, firstNameError),
);
lastNameInput.addEventListener('input', () =>
  validateName(lastNameInput.value, lastNameError),
);
cardInput.addEventListener('input', () => validateCard(cardInput.value));
expDate.addEventListener('input', () => validateExpDate(expDate.value));
