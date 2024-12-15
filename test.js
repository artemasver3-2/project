const request = require('supertest');
const server = require('./api/server'); 
const db = require('./data/db-config.js'); 

beforeEach(async () => {
  await db('posts').truncate(); 
  await db('users').truncate(); 

 
  const [user_id] = await db('users').insert({ username: 'testUser1', password: 'password123' });
  await db('posts').insert({ title: 'Test Post', content: 'Test Content', user_id });
});


// users

describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.status).toBe(200);
  });
});

describe('GET /api/users/:user_id', () => {
  it('should return a user by ID', async () => {
    const res = await request(server).get('/api/users/1');
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('testUser1'); 
  });

  it('should return 404 if the user is not found', async () => {
    const res = await request(server).get('/api/users/999'); 
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found.');
  });
  });

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const newUser = { username: 'newUser1', password: 'password123' };
    const res = await request(server).post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('newUser1');
  });

  it('should return 400 if username or password is missing', async () => {
    const res = await request(server).post('/api/users').send({
      username: 'userWithoutPassword',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Password is required and must be a string.');
  })
  });
  

  
  // posts 

  describe('GET /api/posts', () => {
    it('should return all posts', async () => {
      const res = await request(server).get('/api/posts');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true); 
    });
  });

  describe('GET /api/posts/:post_id', () => {
    it('should return a post by ID', async () => {
      const res = await request(server).get('/api/posts/1');
      expect(res.status).toBe(200);
      expect(res.body.title).toBeDefined();
    });
  
    it('should return 404 if post not found', async () => {
      const res = await request(server).get('/api/posts/999'); 
      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Post not found.');
    });
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const res = await request(server)
        .post('/api/posts')
        .send({
          title: 'My first post',
          content: 'This is my first post content',
          user_id: 1
        });
      expect(res.status).toBe(201);
      expect(res.body.title).toBe('My first post');
    });
  
    it('should return 400 if user_id is missing', async () => {
      const res = await request(server)
        .post('/api/posts')
        .send({
          title: 'Invalid Post',
          content: 'This post has no user_id'
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('A valid user_id is required and must be a number.');
    });
  });

  describe('DELETE /api/posts/:post_id', () => {
    it('should delete a post by ID', async () => {
      const res = await request(server).delete('/api/posts/1');
      console.log('Response Body:', res.body); // Log response body
      console.log('Response Status:', res.status); // Log response status
      expect(res.status).toBe(204);
    });
  })
