exports.seed = function (knex) {
  return knex('posts')
    .del()
    .then(() => knex('users').del())
    .then(() => {
      return knex('users').insert([
        {
          user_id: 1,
          username: 'bob',
          password:
            '$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq',
        },
        {
          user_id: 2,
          username: 'alice',
          password: '192837465',
        },
        {
          user_id: 3,
          username: 'charlie',
          password: '5f4dcc3b5aa765d61d8327deb882cf99',
        },
      ]);
    })
    .then(() => {
      return knex('posts').insert([
        {
          post_id: 1,
          title: 'Introduction to Node.js',
          content:
            "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine.",
          user_id: 1,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 2,
          title: 'Why Learn Express.js?',
          content:
            'Express.js makes building web applications in Node.js much simpler and faster.',
          user_id: 2,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 3,
          title: 'Understanding Middleware',
          content:
            'Middleware functions are a key concept in Express.js for request/response handling.',
          user_id: 1,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 4,
          title: 'Database Migrations 101',
          content:
            'Migrations help you manage database schema changes effectively.',
          user_id: 3,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 5,
          title: 'RESTful API Design Principles',
          content:
            'Learn the best practices for designing RESTful APIs in web applications.',
          user_id: 1,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 6,
          title: 'Authentication with JWT',
          content:
            'JSON Web Tokens (JWT) are a secure way to authenticate users in your app.',
          user_id: 2,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 7,
          title: 'Deploying Node.js Applications',
          content:
            'Explore strategies for deploying your Node.js application to production.',
          user_id: 3,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 8,
          title: 'Handling Errors in Express.js',
          content:
            'Learn how to handle errors gracefully in your Express.js applications.',
          user_id: 2,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 9,
          title: 'What is Knex.js?',
          content:
            'Knex.js is a SQL query builder for Node.js that simplifies database interactions.',
          user_id: 1,
          created_at: new Date().toISOString(),
        },
        {
          post_id: 10,
          title: 'Asynchronous Programming in Node.js',
          content:
            'Master asynchronous programming in Node.js with callbacks, promises, and async/await.',
          user_id: 3,
          created_at: new Date().toISOString(),
        },
      ]);
    });
};
