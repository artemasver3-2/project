const Posts = require('./postsModel');
const Users = require('./usersModel');

const checkIfPostExists = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    req.post = post;
    next();
  } catch (err) {
    next(err);
  }
};

const validatePostData = async (req, res, next) => {
  const { title, content, user_id } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required and must be a string.' });
  }

  if (!content || typeof content !== 'string' || content.trim() === '') {
    return res.status(400).json({ message: 'Content is required and must be a string.' });
  }

  if (!user_id || typeof user_id !== 'number') {
    return res.status(400).json({ message: 'A valid user_id is required and must be a number.' });
  }

  try {
    const matchedID = await Users.findById(user_id);
    if (!matchedID) {
      return res.status(400).json({ message: 'User ID does not exist.' });
    }
    next(); 
  } catch (err) {
    next(err); 
  }
}

const checkUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username });
    if (user.length) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    next();
  } catch (err) {
    next(err);
  }
};

const validateUserInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Username is required and must be a string.' });
  }
  if (!password || typeof password !== 'string' || password.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Password is required and must be a string.' });
  }
  next();
};

module.exports = {
  checkUsernameExists,
  validatePostData,
  checkIfPostExists,
  validateUserInput,
};
