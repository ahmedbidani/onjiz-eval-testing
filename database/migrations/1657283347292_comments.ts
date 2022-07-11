import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PostType } from '../../contracts/enum'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('content').notNullable()
      table.enum('post_type',Object.values(PostType)).nullable().defaultTo(PostType.POST)
      table.boolean('liked').defaultTo(false).notNullable()
      table
      .integer('post_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('all_posts')
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
