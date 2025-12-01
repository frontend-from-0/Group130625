const BASE_URL = 'https://jsonplaceholder.typicode.com/';

function getPosts() {
  fetch(BASE_URL + 'psts')
    .then((response) => {
      if (!response.ok) throw Error('An error occured!');
      return response.json();
    })
    .then((data) => console.table(data))
    .catch((error) => console.error('An error occured:', error));
}

function getAlbums() {
  fetch(BASE_URL + 'albums')
    .then((response) => response.json())
    .then((data) => console.table(data));
}

function getPhotos() {
  fetch(BASE_URL + 'photos')
    .then((response) => response.json())
    .then((data) => console.table(data));
}
function getUsers(){
  fetch(BASE_URL + 'users')
  .then((response) => response.json())
  .then((data) => console.table(data))
}



document
  .getElementById('tiggerFetch')
  .addEventListener('click', () => getUsers());

