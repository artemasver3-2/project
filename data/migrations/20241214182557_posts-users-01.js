exports.up = function (knex) {
  return knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 128).notNullable().unique();
      users.string('password', 128).notNullable();
    })
    .then(() => {
      return knex.schema.createTable('posts', (table) => {
        table.increments('post_id');
        table.string('title').notNullable();
        table.text('content').notNullable();
        table
          .integer('user_id')
          .unsigned()
          .notNullable()
          .references('user_id')
          .inTable('users')
          .onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('posts').then(() => {
    return knex.schema.dropTableIfExists('users');
  });
};
