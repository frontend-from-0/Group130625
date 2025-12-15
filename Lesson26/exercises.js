// 1. Convert the function below into asyncrounous function using async/await and try/catch syntax.
function fetchPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts) => console.log(posts))
    .catch((error) => console.error(error));
}

async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    console.log(await response.json());
  } catch (error) {
    console.error(error);
  }
}
// 2. Convert the function below into asyncrounous function using async/await and try/catch syntax.
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 2000);
  });
};

// IIFE
(async function () {
  try {
    const response = await fetchData();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();

// 3. Convert the function below into asyncrounous function using async/await and try/catch syntax.
// const fetchUsers = () => {
//   return fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => {
//       console.log(users);
//       return users;
//     });
// };

// fetchUsers()
//   .then((users) => console.log('Total users:', users.length))
//   .catch((error) => console.error(error));

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw Error('An error occured');
  const users = await response.json();
  console.log(users);
  return users;
};

const displayUsersCount = async () => {
  try {
    const users = await fetchUsers();
    console.log('Total users:', users.length);
  } catch (error) {
    console.error(error);
  }
};
displayUsersCount();

// 4. Convert the function below into asyncrounous function using async/await and try/catch syntax.
const fetchUserData = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

fetchUserData()
  .then((user) => console.log('User data:', user))
  .catch((error) => console.error('Error:', error));

const printUserData = async () => {
  try {
    const response = await fetchUserData();
    console.log('User data:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};

printUserData();

// 5. Convert the function below into asyncrounous function using async/await and try/catch syntax.
// const getPostsAndComments = () => {
//   fetch('https://jsonplaceholder.typicode.com/posts/1')
//     .then((response) => response.json())
//     .then((post) => {
//       return fetch(
//         `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
//       );
//     })
//     .then((response) => response.json())
//     .then((comments) => console.log(comments))
//     .catch((error) => console.error(error));
// };

const getPostsAndComments = async () => {
  try {
    // Assume we don't know the post ID initially and make a request to find post by some query
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    const post = await response.json();
    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
    );
    const comments = await commentsResponse.json();
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
};

// 6.Convert the function below into asyncrounous function using async/await and try/catch syntax.

const fetchWithTimeout = (url, timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw Error('Some API request error....');
        resolve(await response.json());
      } catch (error) {
        reject(error);
      }
    }, timeout);
  });
};

const data = fetchWithTimeout('https://jsonplaceholder.typicode.com/posts', 2000)
  .then((posts) => console.log(posts))
  .catch((error) => console.error(error));

const displayPosts = async () => {
  try {
    const posts = await fetchWithTimeout(
      'https://jsonplaceholder.typicode.com/posts',
      2000,
    );
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
};
