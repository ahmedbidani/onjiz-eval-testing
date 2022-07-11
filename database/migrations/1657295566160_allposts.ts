import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PostType } from '../../contracts/enum'

export default class Allposts extends BaseSchema {
  protected tableName = 'all_posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('content').notNullable()
      table.enum('post_type',Object.values(PostType)).notNullable().defaultTo(PostType.POST)
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
