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

const showFullPost = (id, title, content) => {
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
            <input type="text" class="form-control" placeholder="${title}" id="new-blog-post-title" value="${title}">
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

const showDeletePost = (id, title, content) => {
  return ` 
  <div class="blog-post" id="delete-post">
    <h4 class="blog-post-title" id="blog-post-title-${id}">${title}</h4>
    <p class="blog-post-content" id="blog-post-content-${id}">${content}
      <span class="blog-post-links" id="blog-post-links-${id}">
        Delete Post - are you sure? 
        <a href="/?show=delete&post=${id}" class="delete-post" id="confirm-delete-post-${id}">Yes - Delete</a>
        <a href="/?show=delete&post=${id}" class="delete-post" id="cancel-delete-post-${id}">No - Cancel</a>
      </span>
    </p>
  </div>
`
}