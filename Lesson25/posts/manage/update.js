const params = new URLSearchParams(document.location.search);

const postId = params.get('postId');

console.log('postId', postId);