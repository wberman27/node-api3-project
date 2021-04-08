const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const mw = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/api/users', (req, res) => {
  Users.get()
  .then(array =>{
    res.status(200).json(array)
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.get('/api/users/:id', mw.validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/api/users/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Users.insert(req.body)
  .then(user =>{
    res.status(201).json(user)
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.put('/api/users/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  const changes = req.body
  Users.update(req.user.id, changes)
  .then(() =>{
    return Users.getById(req.user.id)
    .then(updatedPost =>{
      res.status(201).json(updatedPost)
    })
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.delete('/api/users/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  Users.remove(req.user.id)
  .then(() =>{
    return Users.getById(req.user.id)
    .then(() =>{
      res.status(201).json(req.user)
    })
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.get('/api/users/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  Posts.get(req.user.id)
  .then(array =>{
    const newArray = array.filter(post => post.user_id === req.user.id)
    res.status(200).json(newArray)
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

router.post('/api/users/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  Posts.insert(req.body)
  .then(updatedPost =>{
    res.status(201).json(updatedPost)
  })
  .catch(err =>{
    res.status(500).json(err.message)
  })
});

// do not forget to export the router
module.exports = router