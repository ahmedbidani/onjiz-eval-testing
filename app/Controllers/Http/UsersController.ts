import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/User'

export default class UsersController {
    public async index( ctx : HttpContextContract){
        const users = await Users.all() //select all users
        return users
    }
    public async show ({ params }) {
        const user = await Users.findOrFail(params.id) //select user by id
        return user
    }
    public async store({ request , response } : HttpContextContract){
        const req = request.body()
        const user = await Users.create(req) //create new user
        return user
    }
    public async update({ params , request } : HttpContextContract){
        const req = request.body()
        const user = await Users.findOrFail(params.id) 
        user.name = req.name
        return user.save()
    }
    public async destroy({ params } : HttpContextContract){
        const user = await Users.findOrFail(params.id) 
        await user.delete()
        const users = await Users.all() //select all users

        return users
    }
}
