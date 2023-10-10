import { MongoClient, ObjectId } from "mongodb"
import { ArtModel } from "../models/artModel.js";

const client = new MongoClient('mongodb+srv://bartoloni:bartoloni@cluster0.hrfhf4t.mongodb.net/')
const db = client.db('AH20232CP1')

export class UserModel {
    static async getAll({filtros}) {
        let filtrosArmados = {}
        if (filtros.username) {
            filtrosArmados = {$text: {
                $search: filtros.username,
                $caseSensitive: false,
                $diacriticSensitive: false
              }}
        }
        return await db.collection('users').find(filtrosArmados).toArray()
    }

    static async getByID({id}){
        try {
            return db.collection('users').findOne({ _id: new ObjectId(id) })
        } catch (error) {
            return {"message": 'Ocurrio un error al intentar obtener el documento'}
        }
    }

    static async create({ newUser }) {
        const artsPromises = newUser.arts.map(artId => ArtModel.getByID({ id: artId }));
        const arts = await Promise.all(artsPromises);
    
        const createdUser = {
            "username": newUser.username,
            "image": newUser.image ? newUser.image : 'https://picsum.photos/200/200',
            "description": newUser.description ?? 'Sin descripcion',
            "arts": arts.map(art => ({
                "_id": art._id,
                "name": art.name,
                "description": art.description,
                "link": art.link,
                "img": art.img,
                "section": art.section
            })) || []
        };
    
        try {
            const user = await db.collection('users').insertOne(createdUser);
            createdUser._id = user.insertedId;
            return createdUser;
        } catch (error) {
            return {"message": `No se ha podido agregar el usuario a la base de datos: ${error}`};
        }
    }
    

    static async delete({id}){
        try {
            await db.collection('users').deleteOne({_id: new ObjectId(id)})
            return id
        } catch (error) {
            return {"message": 'Ocurrio un error al intentar eliminar el documento', error}
        }
    }

    static async update({ id, datos }) {
        const datosactuales = await this.getByID({ id: id });
    
        const artsPromises = datos.arts.map(artId => ArtModel.getByID({ id: artId }));
        const arts = await Promise.all(artsPromises);
    
        const nuevosdatos = {
            username: datos.username ?? datosactuales.username,
            image: datos.image ? datos.image : datosactuales.image,
            description: datos.description ?? datosactuales.description,
            arts: arts.map(art => ({
                "_id": art._id,
                "name": art.name,
                "description": art.description,
                "link": art.link,
                "img": art.img,
                "section": art.section,
            })) || datosactuales.arts
        };
    
        try {
            await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: nuevosdatos })
            return id
        } catch (error) {
            return { "message": `Ocurrió un error al intentar actualizar el documento`, error };
        }
    }
    
}