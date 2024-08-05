document.getElementById('fetch-posts').addEventListener('click', () => {
  fetchPosts();
});

const fetchPosts = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((posts) => {
      displayPosts(posts);
    })
    .catch((error) => {
      displayError(error);
    });
};

const displayPosts = (posts) => {
  const posts = document.getElementById('post-list');
  posts.innerHTML = '';
  posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Title: ${post.title}`;
    posts.appendChild(listItem);
  });
};

const displayError = (error) => {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = error.message;
};
