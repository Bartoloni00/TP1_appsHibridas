import express from 'express'
import { ArtsController } from '../controllers/Art.js'

const ArtRoutes = express.Router()

ArtRoutes.get('/arts/', ArtsController.listAll)// todas las obras de arte

ArtRoutes.get('/arts/:id', ArtsController.getByID) // por id

ArtRoutes.get('/arts/section/:section', ArtsController.getBySection) // filtrar por seccion

ArtRoutes.post('/arts/', ArtsController.create)

ArtRoutes.delete('/arts/:id', ArtsController.delete)

ArtRoutes.patch('/arts:id', ArtsController.update)

ArtRoutes.put('/arts/:id', ArtsController.replace)
export default ArtRoutes