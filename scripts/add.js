const addPost = (e) => {
  e.preventDefault()
  const form = document.getElementById('new-post-form')
  const title = form.getElementsByTagName('input')[0].value
  const content = form.getElementsByTagName('textarea')[0].value
  const newPost = {
    title,
    content,
  }
  axios.post(`${BASE_URL}/posts`, newPost)
    .then((result) => {
      window.location = HOMEPAGE
    })
}

const showNewPostForm = () => {
  const domForm = createNewPostForm()
  mainPageContent.innerHTML = domForm
  document.getElementById('new-post-form').addEventListener('submit', addPost)
}
