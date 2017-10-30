const BASE_URL = 'http://localhost:3000'

const createNewDOMPost = (id, title, content) => {
  return ` 
    <div class="blog-post">
      <h4 class="blog-post-title" id="blog-post-title-${id}">${title}</h4>
      <p class="blog-post-content" id="blog-post-content-${id}">${content}</p>
    </div>
  `
}

$('document').ready(() => {
  axios.get(`${BASE_URL}/posts`)
    .then((result) => {
      const posts = result.data.data
      const domPosts = posts.map(post => createNewDOMPost(post.id, post.title, post.content))
      domPosts.forEach(domPost => $('#blog-content').append(domPost))
    })
    .catch(error => console.log('there was an error: ', error))
})
