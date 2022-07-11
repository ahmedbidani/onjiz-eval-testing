import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comments from 'App/Models/Comment'
import AllPosts from 'App/Models/AllPost'
import Reaction from 'App/Models/Reaction'

export default class CommentsController {

    public async index( ctx : HttpContextContract){
        const postComments = await Comments.query().where('post_id',ctx.params.allpost_id) //get comments for a post
        return postComments
    }
    public async show ({ params }) {
        const comment = await Comments.findOrFail(params.id) //get comment by id
        return comment
    }
    public async store({ request ,params, response } : HttpContextContract){
        const req = request.body()
        const postId = parseInt(params.allpost_id) 
        const post = await AllPosts.find(postId)
        req.post_id = postId
        // const comment = await post.related('comments').create(req)
        const comment = await Comments.create(req) //create new comment
        return comment
    }
    public async update({ params , request } : HttpContextContract){
        const req = request.body()
        const comment = await Comments.findOrFail(params.id) 
        comment.content = req.content //update content
        return comment.save() //save
    }
    public async destroy({ params } : HttpContextContract){
        const comment = await Comments.findOrFail(params.id) 
        await comment.delete()
    }
    public async likeUnlike ( { request ,params, response }: HttpContextContract) {
        try{
            const req = request.body()
            const userId = req.user_id
            const emoji = req.emoji
            const commentId = await parseInt(params.comment_id)
            req.commentId = await commentId
            let reaction = await Reaction.findBy('comment_id',commentId)
            if(reaction){
                await Reaction.query().where('comment_id',commentId).update({emoji:req.emoji})
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
