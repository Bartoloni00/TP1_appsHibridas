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
}