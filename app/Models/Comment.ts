import { DateTime } from 'luxon'
import { BaseModel, column,belongsTo,BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import AllPost from './AllPost'
import Reaction from './Reaction'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public content: string

  @column()
  public postType: string

  @column()
  public userId?: number

  @column()
  public liked: Boolean

  @column()
  public postId?: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @belongsTo(() => User,{
    localKey: 'userId'
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => AllPost,{
    localKey: 'postId'
  })
  public post: BelongsTo<typeof AllPost>

  @hasMany(()=>Reaction,{
    foreignKey:'commentId'
  })
  public reactions: HasMany<typeof Reaction>
}
