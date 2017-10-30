const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')

const postFile = path.join(__dirname, 'posts.json')

const getAllPosts = () => {
  const posts = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  return posts
}

const getOnePost = (id) => {
  const posts = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  const post = posts.find(item => item.id === id)
  if (post) return post
  return { error: { status: 404, message: 'post not found' } }
}

const createNewPost = (body) => {
  const { title, content } = body
  const errors = []
  if (!title) errors.push('Title is required')
  if (!content) errors.push('Content is required')

  if (errors.length > 0) {
    return { error: { status: 400, message: 'There were errors', errors } }
  }
  const id = uuid()
  const newPost = { id, title, content }
  const posts = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  posts.push(newPost)
  fs.writeFileSync(postFile, JSON.stringify(posts))
  return newPost
}

const updatePost = (id, body) => {
  const posts = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  const post = posts.find(item => item.id === id)
  if (!post) return { error: { status: 404, message: 'post not found' } }

  const { title, content } = body
  const errors = []
  if (!title) errors.push('Title is required')
  if (!content) errors.push('Content is required')

  if (errors.length > 0) {
    return { error: { status: 400, message: 'There were errors', errors } }
  }

  post.title = title
  post.content = content

  fs.writeFileSync(postFile, JSON.stringify(posts))

  return post
}

const deletePost = (id) => {
  const posts = JSON.parse(fs.readFileSync(postFile, 'utf-8'))
  const post = posts.find(item => item.id === id)
  if (!post) return { error: { status: 404, message: 'post not found' } }
  const index = posts.indexOf(post)

  posts.splice(index, 1)
  fs.writeFileSync(postFile, JSON.stringify(posts))

  return post
}

module.exports = {
  getAllPosts,
  getOnePost,
  createNewPost,
  updatePost,
  deletePost
}