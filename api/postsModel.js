const db = require('../data/db-config.js');

function find() {
  return db('posts');
}

function findById(post_id) {
  return db('posts').where({ post_id }, post_id).first();
}

async function add(post) {
  const [id] = await db('posts').insert(post);
  return findById(id);
}

function remove(post_id) {
  return db('posts').where({ post_id }).del();
}

module.exports = {
  find,
  findById,
  add,
  remove,
};
