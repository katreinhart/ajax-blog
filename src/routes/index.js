const express = require('express')
const ctrl = require('../controller')

const router = express.Router()

router.get('/', ctrl.getAllPosts)
router.get('/:id', ctrl.getOnePost)
router.post('/', ctrl.createNewPost)

module.exports = router
