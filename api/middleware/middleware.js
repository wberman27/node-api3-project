const Users = require('../users/users-model')

function logger(req, res, next) {
  let date = new Date().toUTCString();
  console.log(req.method, req.url, date)
  next()
}

function validateUserId(req, res, next) {
  const {id} = req.params
  Users.getById(id)
  .then(post =>{
    if(!post){
      res.status(404).json({ message: "user not found" })
    }else{
      req.user = post;
      next()
    }
  })
}

function validateUser(req, res, next) {
  const name = req.body.name
  if(!name){
    res.status(400).json({ message: "missing required name field" })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  const post = req.body.text
  if(!post){
    res.status(400).json({ message: "missing required text field" })
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}