/*
1. Declare variable that store elements that we need to use for this task

2. Add event listeners (on click - buttons , on change - inputs)

3. Take data from current element and show it in the target output field.

*/
const dateInput = document.getElementById('date');
const dateOutput = document.getElementById('selected-date');
const timeslotButtons = document.querySelectorAll('.slot');
const selectedTimeOutput = document.getElementById('selected-time');
const form = document.getElementById('booking_form');
const confirmation = document.getElementById('confirmation');
const confirmedDate = document.getElementById('confirmed-date');
const confirmedTime = document.getElementById('confirmed-time');
const confirmButton = document.getElementById('confirm');

// TODO: set min date for tomorrow or any other future date

const data = {
  date: null,
  time: null,
};

dateInput.addEventListener('change', () => {
  dateOutput.textContent = dateInput.value;
  data.date = dateInput.value;

  allowSubmit();
});

timeslotButtons.forEach(function (element) {
  element.addEventListener('click', () => showSelectedTime(element));
});

function showSelectedTime(element) {
  element.classList.add('selected');
  // TODO: deselect element if another one is selected
  selectedTimeOutput.textContent = element.textContent;
  data.time = element.textContent;
  allowSubmit();
}

function allowSubmit() {
  if (data.date && data.time) {
    confirmButton.removeAttribute('disabled');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!data.date && !data.time) return;

  form.classList.add('hidden');
  confirmation.classList.remove('hidden');
  confirmedDate.textContent = data.date;
  confirmedTime.textContent = data.time;
});
