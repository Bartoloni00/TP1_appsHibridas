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
        UserModel.create({newUser: req.body})
        .then((createUser)=>{
            res.status(201).json(createUser)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({"message": `Error al intentar agregar una nueva obra de arte: ${err}`})
        })
    }
    
    static async delete(req, res){
        
    }

    static async update(req, res){
        
    }
}