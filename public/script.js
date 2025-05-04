document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if (!title || !content) {
      alert('Title and content cannot be empty!');
      return;
  }
  await fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
  });
  document.getElementById('postForm').reset();
  loadPosts();
});

async function loadPosts() {
  const res = await fetch('/posts');
  const posts = await res.json();
  const postsDiv = document.getElementById('posts');
  postsDiv.innerHTML = '';
  posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'post';
      div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <a href="/edit?id=${post.id}"><button>Edit</button></a>
          <button onclick="deletePost(${post.id})">Delete</button>
      `;
      postsDiv.appendChild(div);
  });
}

async function deletePost(id) {
  await fetch(`/posts/${id}`, { method: 'DELETE' });
  loadPosts();
}

window.onload = loadPosts;
