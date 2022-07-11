import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableReactions extends BaseSchema {
  protected tableName = 'reactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('emoji')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id').inTable('users')
        .onDelete('CASCADE')
      table
      .integer('comment_id')
      .unsigned()
      .nullable()
      .references('id').inTable('comments')
      .onDelete('CASCADE')
      table
      .integer('reply_id')
      .unsigned()
      .nullable()
      .references('id').inTable('replies')
      .onDelete('CASCADE')
      table.timestamps(true)

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
