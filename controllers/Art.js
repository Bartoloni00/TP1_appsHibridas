import { ArtModel } from "../models/artModel.js";
import { UserModel } from "../models/userModel.js";
import { ArtViews } from "../views/artViews.js";

export class ArtsController {
    static async home (req, res) {
        res.send(await ArtViews.home())
    }

    static async listAll (req, res) {
        let filtros = req.query
        res.send(await ArtViews.listAll({arts: await ArtModel.getAll({filtros:filtros})}))
    }

    static async getByID (req, res) {
        const id = req.params.id
        res.send(await ArtViews.getByID({art: await ArtModel.getByID({id: id})}))
    }

    static async createView(req, res){
        res.send(await ArtViews.create({users: await UserModel.getAll({filtros: {}})}))
    }

    static async create (req, res) {
        ArtModel.createArt(req.body)
        .then((createArt)=>{
            res.status(201).redirect(`/arts/${createArt._id}`)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({"message": "Error al intentar agregar una nueva obra de arte"})
        })
        
    }

    static async deleteView (req, res) {
        const id = req.params.id

        res.send(await ArtViews.delete({art: await ArtModel.getByID({id: id})}))
    }

    static async delete (req, res) {
        const id = req.params.id
        ArtModel.deleteArt({id:id})
        .then(deletedArt=>{
            res.status(200).redirect(`/arts`)
        })
        .catch(err=>{
            res.status(500).json({"message": `Ocurrio un error al eliminar la obra de arte: ${err}`})
        })
    }

    static async updateView (req, res) {
        const id = req.params.id

        res.send(await ArtViews.update({datos: await ArtModel.getByID({id: id}), users: await UserModel.getAll({filtros:{}})}))
    }

    static async update (req, res) {
        const id = req.params.id
        
        ArtModel.updateArt({
            id:id,
            producto:req.body,
            datosactuales: await ArtModel.getByID({id:id})
            
        })
          .then(() => res.status(200).redirect(`/arts/${id}`))
          .catch(err => {
            console.log(err)
            res.json({"message": `ocurrio un error al editar la obra`, err})
          })
    }
}

