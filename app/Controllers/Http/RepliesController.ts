// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reply from 'App/Models/Reply'
import User from 'App/Models/User'
import Reaction from 'App/Models/Reaction'
import { validator } from '@ioc:Adonis/Core/Validator'

export default class RepliesController {
    
    public async index( { params }){
        const commentReplies = await Reply.query().where('comment_id',params.comment_id) //get comments for a post
        return commentReplies
    }
    public async show ({ params }) {
        const post = await Reply.findOrFail(params.id) //select post by id
        return post
    }
    public async store({ request ,params, response } : HttpContextContract){
        const reply = request.body()
        const commentId = parseInt(params.comment_id)
        reply.comment_id = commentId
        const replies = Reply.create(reply)
        return replies   
    }

    public async update({ params , request } : HttpContextContract){
        const req = request.body()
        const reply = await Reply.findOrFail(params.id) 
        reply.content = req.content //change content
        return reply.save()
    }
    public async destroy({ params } : HttpContextContract){
        const reply = await Reply.findOrFail(params.id) 
        await reply.delete()
        // const replies = await Reply.all() //select all posts
        // return replies
    }
    public async likeUnlike ( { request ,params, response }: HttpContextContract) {
        try{
            const req = request.body()
            const userId = req.user_id
            const emoji = req.emoji
            const replyId = await parseInt(params.reply_id)
            req.replyId = await replyId
            let reaction = await Reaction.findBy('reply_id',replyId)
            if(reaction){
                await Reaction.query().where('reply_id',replyId).update({emoji:req.emoji})
            }else{
                // console.log(req,'req')
                await Reaction.create(req)
            }
            return reaction
        }catch(error){
            console.log(error)
        }
    }
}


