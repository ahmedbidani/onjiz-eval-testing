import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo , BelongsTo ,hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'

export default class AllPost extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public postType: string

  @column()
  public userId?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User,{
    localKey:'userId'
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment , {
    foreignKey: 'postId' 
  })
  public comments: HasMany<typeof Comment>
}
