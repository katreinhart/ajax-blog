const showAll = (posts) => {
  const domPosts = posts.map(post => createIndexPost(post.id, post.title, post.content))
  domPosts.forEach((domPost) => {
    mainPageContent.innerHTML += domPost
  })
}

const showAllPosts = () => {
  axios.get(`${BASE_URL}/posts`)
    .then((result) => {
      const posts = result.data.data
      showAll(posts)
    })
    .catch(error => console.error('There was an error:', error))
}