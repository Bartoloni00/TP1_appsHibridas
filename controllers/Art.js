import { ArtModel } from "../models/mongoDB.js";

export class ArtsController {
    static async listAll (req, res) {
        res.send(await ArtModel.getAll())
    }

    static async getByID (req, res) {
        const id = req.params.id
        res.send(await ArtModel.getByID({id: id}))
    }

    static async getBySection (req, res) {
        const section = req.params.section
        await ArtModel.getBySection({section : section})
            .then(data=>{
                if (!data.length > 0) {
                    res.status(404).send({message: `Error 404: No se encontraron obras de arte en la categoria: ${section}`})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
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
        
    }

    static async update (req, res) {
        
    }
}

