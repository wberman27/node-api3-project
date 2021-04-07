const express = require('express');
const mw = require('./middleware/middleware')
const usersRouter = require('./users/users-router');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());

// global middlewares and the user's router need to be connected here
server.use(mw.logger);



//end global middlewares
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
