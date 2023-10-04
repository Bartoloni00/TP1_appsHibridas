import express from 'express'
import { ArtsController } from '../controllers/Art.js'

const ArtRoutes = express.Router()

ArtRoutes.get('/', ArtsController.listAll)// todas las obras de arte

ArtRoutes.get('/arts/:id', ArtsController.getByID) // por id

ArtRoutes.get('/arts/section/:section', ArtsController.getBySection) // filtrar por seccion

ArtRoutes.post('/', ArtsController.create)

ArtRoutes.delete('/:id', ArtsController.delete)

ArtRoutes.patch('/:id', ArtsController.update)

export default ArtRoutes