import { ArtModel } from "../models/mongoDB.js";

export class ArtsController {
    static async listAll (req, res) {
        let filtros = {}
        if(req.query.section){
            filtros.section = req.query.section
        }
        if (req.query.min && req.query.max) {
            filtros.price = {$gte: parseInt(req.query.min),$lte: parseInt(req.query.max)}
        }
        else if (req.query.min) {
            filtros.price = {$gte: parseInt(req.query.min)}
        }
        else if (req.query.max) {
            filtros.price = {$lte: parseInt(req.query.max)}
        }
        console.log(filtros);
        res.send(await ArtModel.getAll({filtros:filtros}))
    }

    static async getByID (req, res) {
        const id = req.params.id
        res.send(await ArtModel.getByID({id: id}))
    }

    static async create (req, res) {
        const newArt = {
            "name": req.body.name,
            "description": req.body.description,
            "link": req.body.link,
            "img": req.body.img,
            "section":req.body.section 
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
        const editArt = {
            "name": req.body.name,
            "description": req.body.description,
            "link": req.body.link ?? 'no link',
            "img": req.body.img ?? 'no image',
            "section":req.body.section 
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
            "section":req.body.section 
          }

        ArtModel.replaceArt({id: id, producto: newArt})
          .then(data => res.status(200).json({"message": `Obra de arte remplazada satisfactoriamente: ${id}`, data}))
          .catch(err=>res.send(err))
    }
}

