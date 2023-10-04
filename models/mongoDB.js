import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb+srv://bartoloni:bartoloni@cluster0.hrfhf4t.mongodb.net/')
const db = client.db('AH20232CP1')

export class ArtModel {
    static async getAll() {    
        return await db.collection('arts').find().toArray()
    }

    static async getByID({id}){
        return db.collection('arts').findOne({ _id: new ObjectId(id) })
    }

    static async getBySection({section}){
        const filtro = section
        return await db.collection('arts').find({section: filtro}).toArray()
    }

}
