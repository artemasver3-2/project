const router = require('express').Router();
const Users = require('./usersModel');
const { validateUserInput, checkUsernameExists } = require('./middleware');

router.get('/', (req, res, next) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get('/:id', async (req, res, next) => {
  try {
    const userID = await Users.findById(req.params.id)
  if(!userID){
    res.status(404).json({
      message: 'User not found.'
    })
  } else {
    res.json(userID);
  }
  } catch(err) {
    next(err)
  }
});

router.post('/', validateUserInput, checkUsernameExists, async (req, res, next) => {
  try {
    const existingUser = await Users.findBy({ username: req.body.username });
    if (existingUser.length) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    const newUser = await Users.add({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
