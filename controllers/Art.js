import { ArtModel } from "../models/artModel.js";
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

    static async create (req, res) {
        const newArt = {
            "name": req.body.name,
            "description": req.body.description,
            "link": req.body.link,
            "img": req.body.img,
            "section":req.body.section,
            "price": req.body.price ?? 1,
            "owner": req.body.owner
          }

        ArtModel.createArt(newArt)
        .then((createArt)=>{
            res.status(201).json(createArt)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({"message": "Error al intentar agregar una nueva obra de arte"})
        })
        
    }

    static async delete (req, res) {
        const id = req.params.id
        ArtModel.deleteArt({id:id})
        .then(deletedArt=>{
            res.status(200).json({"message": `Obra de arte eliminada satisfactoriamente: ${deletedArt}`})
        })
        .catch(err=>{
            res.status(500).json({"message": `Ocurrio un error al eliminar la obra de arte: ${err}`})
        })
    }

    static async update (req, res) {
        const id = req.params.id
        const datosactuales = await ArtModel.getByID({id:id})
        const editArt = {
            "name": req.body.name ?? datosactuales.name,
            "description": req.body.description ?? datosactuales.description,
            "link": req.body.link ?? datosactuales.link,
            "img": req.body.img ?? datosactuales.img,
            "section":req.body.section ?? datosactuales.section,
            "price": req.body.price ?? datosactuales.price,
            "owner": req.body.owner ?? datosactuales.owner ?? 'sin dueño'
          }
        ArtModel.updateArt({id:id,producto:editArt})
          .then(data => res.status(200).json({"message": `Obra de arte editada exitosamente: ${id}`, data}))
          .catch(err => {
            console.log(err)
            res.json({"message": `ocurrio un error al editar la obra`, err})
          })
    }

    static async replace (req, res) {
        const id = req.params.id
        const newArt = {
            "name": req.body.name,
            "description": req.body.description,
            "link": req.body.link ?? 'no link',
            "img": req.body.img ?? 'no image',
            "section":req.body.section,
            "price": req.body.price ?? 1,
            "owner": req.body.owner
          }

        ArtModel.replaceArt({id: id, producto: newArt})
          .then(data => res.status(200).json({"message": `Obra de arte remplazada satisfactoriamente: ${id}`, data}))
          .catch(err=>res.send(err))
    }
}

