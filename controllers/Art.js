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
        
    }

    static async delete (req, res) {
        
    }

    static async update (req, res) {
        
    }
}

