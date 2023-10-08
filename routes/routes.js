import express from 'express'
import { ArtsController } from '../controllers/Art.js'
import { UserController } from '../controllers/Users.js'

const ArtRoutes = express.Router()

ArtRoutes.get('/arts/', ArtsController.listAll)// todas las obras de arte

ArtRoutes.get('/arts/:id', ArtsController.getByID) // por id

ArtRoutes.post('/arts/', ArtsController.create)

ArtRoutes.delete('/arts/:id', ArtsController.delete)

ArtRoutes.patch('/arts/:id', ArtsController.update)

ArtRoutes.put('/arts/:id', ArtsController.replace)

ArtRoutes.get('/users/', UserController.listAll)

ArtRoutes.get('/users/:id', UserController.getByID)

ArtRoutes.post('/users/', UserController.create)

ArtRoutes.delete('/users/:id', UserController.delete)

ArtRoutes.patch('/users/:id', UserController.update)
export default ArtRoutes