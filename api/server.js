const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRoutes = require('./UsersRouter');
const postsRoutes = require('./PostsRouter');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRoutes);
server.use('/api/posts', postsRoutes);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'wompx2',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
