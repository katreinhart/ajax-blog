const showOne = (post) => {
  const domPost = showFullPost(post.id, post.title, post.content)
  mainPageContent.innerHTML = domPost
}

const showOnePost = (id) => {
  axios.get(`${BASE_URL}/posts/${id}`)
    .then((result) => {
      const post = result.data
      showOne(post)
    })
    .catch(error => console.error('There was an error:', error))
}