import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import Reaction from './Reaction'
import User from './User'

export default class Reply extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public userId?: number

  @column()
  public commentId?: number

  @column()
  public parentId?: number

  @column()
  public liked: Boolean

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User,{
    localKey: 'userId'
  })
  public user: BelongsTo<typeof User>

  @hasMany(()=>Reaction,{
    localKey:'id'
  })
  public reactions: HasMany<typeof Reaction>
}
