import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import AllPost from 'App/Models/AllPost'
import Reaction from 'App/Models/Reaction'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => AllPost , {
    foreignKey:'userId' 
  })
  public all_posts: HasMany<typeof AllPost>

  @hasMany(() => Reaction , {
    foreignKey:'userId' 
  })
  public reactions: HasMany<typeof Reaction>
}
