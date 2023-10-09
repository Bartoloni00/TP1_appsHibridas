import express from 'express'
import { ArtsController } from '../controllers/ArtApiController.js'
import ApiUserRoutes from '../routes/ApiUserRoutes.js'

const ApiArtRoutes = express.Router()

ApiArtRoutes.get('/arts/', ArtsController.listAll)// listo

ApiArtRoutes.post('/arts/create', ArtsController.create)// listo

ApiArtRoutes.delete('/arts/delete/:id', ArtsController.delete)// listo

ApiArtRoutes.patch('/arts/update/:id', ArtsController.update)// listo

ApiArtRoutes.put('/arts/replace/:id', ArtsController.replace)// listo

ApiArtRoutes.get('/arts/:id', ArtsController.getByID)// listo

ApiArtRoutes.use(ApiUserRoutes)
export default ApiArtRoutes