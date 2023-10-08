import { UserModel } from "../models/userModel.js";

export class UserController {
    static async listAll(req, res){
        let filtros = req.query
        res.send(await UserModel.getAll({filtros: filtros}))
    }

    static async getByID(req, res){
        const id = req.params.id

        res.send(await UserModel.getByID({id: id}))
    }
    
    static async create(req, res){
        
    }
    
    static async delete(req, res){
        
    }

    static async update(req, res){
        
    }
}