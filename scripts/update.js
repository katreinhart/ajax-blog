const updatePost = (e) => {
  e.preventDefault()
  const params = getParamsFromString(window.location.search)
  const id = params.post
  const form = document.getElementById('update-post-form')
  const title = form.getElementsByTagName('input')[0].value
  const content = form.getElementsByTagName('textarea')[0].value
  const updatedPost = {
    title,
    content,
  }
  axios.put(`${BASE_URL}/posts/${id}`, updatedPost)
    .then((result) => {
      window.location.search = `&post=${id}`
      showOnePost(id)
    })
    .catch((error) => {
      console.error('There was an error: ', error)
    })
}

const showUpdatePost = (id) => {
  axios.get(`${BASE_URL}/posts/${id}`)
    .then((result) => {
      const post = result.data
      mainPageContent.innerHTML = updatePostForm(post.id, post.title, post.content)
      document.getElementById('update-post-form').addEventListener('submit', updatePost)
    })
}
