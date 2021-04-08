const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const mw = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(array =>{
    res.status(200).json(array)
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Users.insert(req.body)
  .then(user =>{
    res.status(201).json(user)
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router