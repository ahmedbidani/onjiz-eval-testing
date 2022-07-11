import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AllPosts from 'App/Models/AllPost'
import User from 'App/Models/User'
import { validator } from '@ioc:Adonis/Core/Validator'

export default class AllPostsController {
    
    public async index( { params }){
        try{
            const userId = await parseInt(params.user_id)
            const posts = await AllPosts.query().where('user_id',userId) // get posts for user
            return posts
        }catch(error){
            console.log(error)
        }
    }
    public async show ({ params }) {
        try {
        const post = await AllPosts.findOrFail(params.id) //select post by id
        return post
        }catch (error) {
            console.log(error)
        }
    }
    public async store({ request ,params, response } : HttpContextContract){
        try {
            const req = request.body()
            req.user_id = params.user_id
            // req.save()
            const post = await AllPosts.create(req) //create new post
            return post
        } catch (error) {
            console.log(error)
        }
    }

    public async update({ params , request } : HttpContextContract){
        try{
            const req = request.body()
            const allPost = await AllPosts.findOrFail(params.id) 
            allPost.content = req.content //change content
            return allPost.save()
        }catch (error) {
            console.log(error)
        }
    }
    public async destroy({ params } : HttpContextContract){
        try{

        const post = await AllPosts.findOrFail(params.id) 
        await post.delete()
        const posts = await AllPosts.all() //select all posts
        return posts
        }catch(error){
            console.log(error)
        }
    }
}
