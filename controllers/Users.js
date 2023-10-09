import { ArtModel } from "../models/artModel.js";
import { UserModel } from "../models/userModel.js";
import { userViews } from "../views/userViews.js";

export class UserController {
    static async listAll(req, res){
        let filtros = req.query
        res.send(await userViews.listAll({users: await UserModel.getAll({filtros: filtros})}))
    }

    static async getByID(req, res){
        const id = req.params.id

        res.send(await userViews.getByID({user: await UserModel.getByID({id: id})}))
    }
    
    static async createView(req, res){
        res.send(await userViews.create({arts: await ArtModel.getAll({filtros:{}})}))
    }

    static async create(req, res){
        UserModel.create({newUser: req.body})
        .then((createUser)=>{
            res.status(201).redirect(`/users/${createUser._id}`)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({"message": `Error al intentar agregar una nueva obra de arte: ${err}`})
        })
    }
    
    static async deleteView(req, res) {
        const id = req.params.id
        res.send(await userViews.delete({user: await UserModel.getByID({id: id})}))
    }
    static async delete(req, res){
        const id = req.params.id
        UserModel.delete({id:id})
        .then(()=>{
            res.status(200).redirect('/users/')
        })
        .catch(err=>{
            res.status(500).json({"message": `Ocurrio un error al eliminar al usuario: ${err}`})
        })
    }


    static async updateView(req, res) {
        const id = req.params.id
        res.status(200).send(await userViews.update({
            datosActuales: await UserModel.getByID({id:id}),
            arts: await ArtModel.getAll({filtros:{}})
        }))
    }

    static async update(req, res){
        const id = req.params.id

        UserModel.update({id:id, datos: req.body})
        .then(EditUser => {
            console.log(EditUser);
            res.status(201).redirect(`/users/${EditUser._id}`)
        })
        .catch(err=>{
            res.status(500).json({"message": `Ocurrio un error al editar al usuario: ${err}`})
        })
    }
}