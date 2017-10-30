const BASE_URL = 'http://localhost:3000'
const HOMEPAGE = 'http://localhost:8080'

const mainPageContent = document.getElementById('blog-content')

const createIndexPost = (id, title, content) => {
  return ` 
    <div class="blog-post">
      <h4 class="blog-post-title" id="blog-post-title-${id}">${title}</h4>
      <p class="blog-post-content" id="blog-post-content-${id}">${content}
        <a href="/?post=${id}" class="show-post" id="show-post-${id}">Read more...</a>
      </p>
    </div>
  `
}

const createFullPost = (id, title, content) => {
  return ` 
  <div class="blog-post">
    <h4 class="blog-post-title" id="blog-post-title-${id}">${title}</h4>
    <p class="blog-post-content" id="blog-post-content-${id}">${content}
      <span class="blog-post-links" id="blog-post-links-${id}">
        <a href="/?show=edit&post=${id}" class="edit-post" id="edit-post-${id}">Edit</a>
        <a href="/?show=delete&post=${id}" class="delete-post" id="delete-post-${id}">Delete</a>
      </span>
    </p>
  </div>
`
}

const createNewPostForm = () => {
  return `
    <div class="row new-post-form" id="new-post">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <form id="new-post-form">
          <div class="form-group row">
            <label for="new-blog-post-title">Title</label>
            <input type="text" class="form-control" placeholder="Title" id="new-blog-post-title">
          </div>
          <div class="form-group row">
            <label for="new-blog-post-content">Content</label>
            <textarea name="new-blog-post-content" class="form-control" id="new-blog-post-content" cols="30" rows="10"></textarea>
          </div>
          <div class="form-group row">
            <button role="submit" class="btn btn-primary btn-block" id="create-new-post-button">Create</button>
          </div>
        </form>
      </div>
    </div>
  `
}

const updatePostForm = (id, title, content) => {
  return `
    <div class="row update-post-form" id="update-post">
      <div class="col-sm-1"></div>
      <div class="col-sm-10">
        <form id="update-post-form">
          <div class="form-group row">
            <label for="new-blog-post-title">Title</label>
            <input type="text" class="form-control" placeholder="${title}" id="new-blog-post-title">
          </div>
          <div class="form-group row">
            <label for="new-blog-post-content">Content</label>
            <textarea name="new-blog-post-content" class="form-control" id="new-blog-post-content" cols="30" rows="10">${content}</textarea>
          </div>
          <div class="form-group row">
            <button role="submit" class="btn btn-primary btn-block" id="create-new-post-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  `
}

const showOne = (post) => {
  const domPost = createFullPost(post.id, post.title, post.content)
  mainPageContent.innerHTML = domPost
}

const showAll = (posts) => {
  const domPosts = posts.map(post => createIndexPost(post.id, post.title, post.content))
  domPosts.forEach((domPost) => {
    mainPageContent.innerHTML += domPost
  })
}

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

const updatePost = (e) => {
  e.preventDefault()
  console.log(window.location)
  const params = getParamsFromString(window.location.search)
  const id = params.post
  console.log(params)
  const form = document.getElementById('update-post-form')
  const title = form.getElementsByTagName('input')[0].value
  const content = form.getElementsByTagName('textarea')[0].value
  const updatedPost = {
    title,
    content,
  }
  axios.put(`${BASE_URL}/posts/${id}`, updatedPost)
    .then((result) => {
      window.location = HOMEPAGE
      console.log('success!')
    })
    .catch((error) => {
      console.error('There was an error: ', error)
    })
}

const showNewPostForm = () => {
  const domForm = createNewPostForm()
  mainPageContent.innerHTML = domForm
  document.getElementById('new-post-form').addEventListener('submit', addPost)
}

const showUpdatePost = (id) => {
  axios.get(`${BASE_URL}/posts/${id}`)
    .then((result) => {
      const post = result.data
      mainPageContent.innerHTML = updatePostForm(post.id, post.title, post.content)
      document.getElementById('update-post-form').addEventListener('submit', updatePost)
    })
}

const getParamsFromString = (string) => {
  const params = {}
  const args = string.split('&')
  args[0] = args[0].slice(1)
  args.forEach((arg) => {
    const vals = arg.split('=')
    params[vals[0]] = vals[1]
  })
  return params;
} 

const showAllPosts = () => {
  axios.get(`${BASE_URL}/posts`)
    .then((result) => {
      const posts = result.data.data
      showAll(posts)
    })
    .catch(error => console.error('There was an error:', error))
}

const showOnePost = (id) => {
  axios.get(`${BASE_URL}/posts/${id}`)
    .then((result) => {
      const post = result.data
      showOne(post)
    })
    .catch(error => console.error('There was an error:', error))
}

const getLocationParam = () => {
  const str = window.location.search
  const args = getParamsFromString(str)

  if (args.hasOwnProperty('')) showAllPosts()

  if (args.hasOwnProperty('show')) {
    switch (args.show) {
      case 'new':
        showNewPostForm()
        break
      case 'edit':
        showUpdatePost(args.post)
        break
      case 'delete':
        console.log('delete one')
        break
      default: 
        console.log('default case hit')
    }
  } else {
    showOnePost(args.post)
  }
  
}

getLocationParam()
