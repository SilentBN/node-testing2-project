exports.up = function (knex) {
  return knex.schema.createTable("tasks", function (table) {
    table.increments("id");
    table.string("title").notNullable();
    table.string("description");
    table.boolean("completed").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
