import express from 'express'
import { ArtsController } from '../controllers/ArtApiController.js'
import ApiUserRoutes from '../routes/ApiUserRoutes.js'

const ApiArtRoutes = express.Router()

ApiArtRoutes.get('/arts/', ArtsController.listAll)

ApiArtRoutes.post('/arts/', ArtsController.create)

ApiArtRoutes.delete('/arts/:id', ArtsController.delete)

ApiArtRoutes.patch('/arts/:id', ArtsController.update)

ApiArtRoutes.put('/arts/:id', ArtsController.replace)

ApiArtRoutes.get('/arts/:id', ArtsController.getByID)

ApiArtRoutes.use(ApiUserRoutes)
export default ApiArtRoutes