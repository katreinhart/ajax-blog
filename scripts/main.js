const mainPageContent = document.getElementById('blog-content')

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
        deletePost(args.post)
        break
      default:
        console.log('default case hit')
    }
  } else {
    showOnePost(args.post)
  }
}

getLocationParam()
