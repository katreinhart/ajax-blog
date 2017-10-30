const model = require('../model')

const getAllPosts = (req, res, next) => {
  const posts = model.getAllPosts()
  res.status(200).json({ data: posts })
}

const getOnePost = (req, res, next) => {
  const { id } = req.params
  const response = model.getOnePost(id)
  if (response.error) res.status(404).json(response)
  res.status(200).json(response)
}

const createNewPost = (req, res, next) => {
  const response = model.createNewPost(req.body)
  if (response.error) res.status(400).json(response)
  res.status(200).json(response)
}

module.exports = {
  getAllPosts,
  getOnePost,
  createNewPost,
  // updatePost,
  // deletePost
}