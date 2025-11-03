console.log(document);

console.log(window);

const h1 = document.getElementById('pageHeading');
h1.style.color = 'rgb(0, 128, 0)';

const textSecondary = document.getElementsByClassName('text-secondary');

console.log(textSecondary);
for (let i = 0; i < textSecondary.length; i++) {
  textSecondary[i].style.color = 'rgb(107, 114, 128)';
}

const pElements = document.getElementsByTagName('p');
[...pElements].forEach((element) => (element.style.fontFamily = 'sans-serif'));

console.log(pElements);

const button = document.querySelector('button');

button.addEventListener('click', () => {
  const body = document.querySelector('body');

  const darkBG = 'rgb(17, 24, 39)';
  const darkForeground = 'rgb(243, 244, 246)';

  const lightBG = 'rgb(255,255,255)';
  const lightForeground = 'rgb(0, 0, 0)';

  console.log(
    typeof body.style.backgroundColor,
    body.style.backgroundColor,
    typeof darkBG,
    darkBG,
  );

  if (body.style.backgroundColor === darkBG) {
    console.log('In the if case....');
    body.style.backgroundColor = lightBG;
    body.style.color = lightForeground;
  } else {
    console.log('In the else case....');
    body.style.backgroundColor = darkBG;
    body.style.color = darkForeground;
  }
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => button.classList.add('btn-primary'));

const inputs = document.getElementsByName('email');
inputs.forEach((input) => (input.placeholder = 'John000@gmail.com'));

const form = inputs[0].parentNode;
form.action = 'contact.php';
form.method = 'post';
console.log(form);


