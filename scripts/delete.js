
const confirmDelete = (e) => {
  e.preventDefault()
  const postId = getParamsFromString(window.location.search).post
  axios.delete(`${BASE_URL}/posts/${postId}`)
    .then((result) => {
      window.location = HOMEPAGE
    })
    .catch((error) => {
      console.error('There was an error:', error)
    })
}

const deletePost = (id) => {
  axios.get(`${BASE_URL}/posts/${id}`) 
    .then((result) => {
      const post = result.data
      console.log('delete post?')
      mainPageContent.innerHTML = showDeletePost(post.id, post.title, post.content)
      document.getElementById(`confirm-delete-post-${id}`).addEventListener('click', confirmDelete)
      document.getElementById(`cancel-delete-post-${id}`).addEventListener('click', showAllPosts)
    })
}
