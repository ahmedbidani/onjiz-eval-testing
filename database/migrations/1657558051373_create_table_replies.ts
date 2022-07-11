import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableReplies extends BaseSchema {
  protected tableName = 'replies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('content').notNullable()
      table.boolean('liked').defaultTo(false).notNullable()
      table
      .integer('comment_id')
      .unsigned()
      .nullable()
      .references('id').inTable('comments')
      .onDelete('CASCADE')
      table
      .integer('parent_id')
      .unsigned()
      .nullable()
      .references('id').inTable('replies')
      .onDelete('CASCADE')
      table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
