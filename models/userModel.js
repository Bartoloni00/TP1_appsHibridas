import { MongoClient, ObjectId } from "mongodb"

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

    static async create({newUser}){
        const createdUser = {
            "username": newUser.username,
            "image": newUser.image ?? 'noimage.png',
            "description": newUser.description ?? 'Sin descripcion',
            "arts": newUser.arts ?? []
        }
        try {
            const user = await db.collection('users').insertOne(createdUser)
            createdUser._id += user.insertedId 
            return createdUser
        } catch (error) {
            return {"message": `No se ha podido agregar la obra a la base de datos ${error}`}
        }
    }
}