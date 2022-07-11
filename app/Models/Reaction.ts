import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo , BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from './Comment'
import Reply from './Reply'

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public emoji: string
  
  @column()
  public userId: number

  @column()
  public commentId: number

  @column()
  public replyId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    localKey: 'userId'
  })
  public user: BelongsTo<typeof User>
  
  @belongsTo(() => Comment,{
    localKey: 'commentId'
  })
  public comment: BelongsTo<typeof Comment>

  
  @belongsTo(() => Reply,{
    localKey: 'replyId'
  })
  public reply: BelongsTo<typeof Reply>
}
