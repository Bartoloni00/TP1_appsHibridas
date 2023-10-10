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

    static async deleteArt({ id }) {
        try {
            const art = await this.getByID({ id: id });
    
            // Verifica si la propiedad 'owner' en el objeto 'art' tiene un valor definido
            if (art.owner && art.owner._id) {
                const ownerId = art.owner._id;
    
                // Eliminar la obra de arte de la colección 'arts'
                await db.collection('arts').deleteOne({ _id: new ObjectId(id) });
    
                // Actualizar el usuario dueño de la obra
                const user = await UserModel.getByID({ id: ownerId });
                if (user) {
                    // Crea un nuevo array que contenga solo las IDs de las obras de arte
                    const nuevoArray = user.arts.filter(userArt => userArt._id.toString() !== id).map(userArt => userArt._id);
                    
                    // Actualiza el usuario con el nuevo array de IDs
                    await UserModel.update({ id: ownerId, datos: { "arts": nuevoArray } });
                }
    
                return id;
            } else {
                throw new Error('La propiedad "owner" en el objeto de arte es undefined o no tiene un _id definido.');
            }
        } catch (error) {
            console.error(error); // Registra cualquier error en la consola para debugging
            throw new Error('Ocurrió un error al intentar eliminar el documento');
        }
    }
    
    

    static async replaceArt({id,producto}){
        const usuario = await UserModel.getByID({id: producto.owner})
        const replaceArt = {
            "name": producto.name,
            "description": producto.description,
            "link": producto.link ?? 'no link',
            "img": producto.img ? producto.img: 'https://picsum.photos/400/225',
            "section":producto.section,
            "price": producto.price ?? 1,
            "owner":{
                "_id":usuario._id,
                "username": usuario.username
            }
          }

        try {
            return db.collection('arts').replaceOne({_id: new ObjectId(id)}, replaceArt)
        } catch (error) {
            return {"message": `Ocurrio un error al intentar remplazar el documento`}
        }        
    }

    static async updateArt({ id, producto, datosactuales }) {
        try {
            let usuario = await UserModel.getByID({ id: producto.owner });
            usuario = usuario || null;
    
            const editArt = {
                "name": producto.name ?? datosactuales.name,
                "description": producto.description ?? datosactuales.description,
                "link": producto.link ?? datosactuales.link,
                "img": producto.img ? producto.img : datosactuales.img ? datosactuales.img : 'https://picsum.photos/400/225',
                "section": producto.section ?? datosactuales.section,
                "price": producto.price ?? datosactuales.price,
                "owner": {
                    "_id": usuario ? usuario._id : '6521da4418effe23503b0c90',
                    "username": usuario ? usuario.username : 'Bartoloni'
                }
            };
    
            const result = await db.collection('arts').updateOne({ _id: new ObjectId(id) }, { $set: editArt });
    
            return result;
        } catch (error) {
            return { "message": `Ocurrió un error al intentar actualizar el documento` };
        }
    }
    
}