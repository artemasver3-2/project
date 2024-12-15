const express = require('express');
const Posts = require('./postsModel'); 
const { checkIfPostExists, validatePostData } = require('./middleware'); 

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});


router.get('/:post_id', checkIfPostExists, (req, res) => {
  res.status(200).json(req.post); 
});

router.post('/', validatePostData, async (req, res, next) => {
  try {
    const newPost = await Posts.add({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
    }); 
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});


router.delete('/:post_id', checkIfPostExists, async (req, res, next) => {
  try {
    const { post_id } = req.params;

    const post = await Posts.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Posts.remove(post_id);
    res.status(204).end(); 
  } catch (err) {
    next(err); 
  }
});

module.exports = router;