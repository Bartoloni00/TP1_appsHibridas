import { MongoClient, ObjectId } from "mongodb"
import { UserModel } from "./userModel.js"

const client = new MongoClient('mongodb+srv://bartoloni:bartoloni@cluster0.hrfhf4t.mongodb.net/')
const db = client.db('AH20232CP1')

export class ArtModel {
    static async getAll({filtros}) {    
        let filtrosArmados = {}
        if(filtros.section){
            filtrosArmados.section = filtros.section
        }
        if (filtros.min && filtros.max) {
            filtrosArmados.price = {$gte: parseInt(filtros.min),$lte: parseInt(filtros.max)}
        }
        else if (filtros.min) {
            filtrosArmados.price = {$gte: parseInt(filtros.min)}
        }
        else if (filtros.max) {
            filtrosArmados.price = {$lte: parseInt(filtros.max)}
        }
        // console.log(filtrosArmados);
        return await db.collection('arts').find(filtrosArmados).toArray()
    }

    static async getByID({id}){
        try {
            return db.collection('arts').findOne({ _id: new ObjectId(id) })
        } catch (error) {
            return {"message": 'Ocurrio un error al intentar obtener el documento'}
        }
    }

    static async createArt(producto){
        const usuario = await UserModel.getByID({id: producto.owner})
        const newArt = {
            "name": producto.name,
            "description": producto.description,
            "link": producto.link,
            "img": producto.img ?producto.img: 'https://picsum.photos/400/225',
            "section":producto.section,
            "price": producto.price ? producto.price: 1,
            "owner":{
                "_id":usuario._id,
                "username": usuario.username
            }
          }
        try {
            const art = await db.collection('arts').insertOne(newArt)
            newArt._id = art.insertedId 
            return newArt
        } catch (error) {
            return {"message": `No se ha podido agregar la obra a la base de datos ${error}`}
        }
    }

    static async deleteArt({id}) {
        try {
            return await db.collection('arts').deleteOne({_id: new ObjectId(id)})
        } catch (error) {
            return {"message": 'Ocurrio un error al intentar eliminar el documento'}
        }
    }

    static async replaceArt({id,producto}){
        try {
            return db.collection('arts').replaceOne({_id: new ObjectId(id)}, producto)
        } catch (error) {
            return {"message": `Ocurrio un error al intentar remplazar el documento`}
        }        
    }

    static async updateArt({id,producto}){
        try { 
            return await db.collection('arts').updateOne({ _id: new ObjectId(id) }, { $set: producto })
        } catch (error) {
            return {"message": `Ocurrio un error al intentar actualizar el documento`}
        }
    }
}
