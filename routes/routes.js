import express from 'express'
import { ArtsController } from '../controllers/Art.js'
import { UserController } from '../controllers/Users.js'

const ArtRoutes = express.Router()

ArtRoutes.get('/', ArtsController.home)

ArtRoutes.get('/arts/', ArtsController.listAll)


ArtRoutes.get('/arts/create', ArtsController.createView)
ArtRoutes.post('/arts/create', ArtsController.create)

ArtRoutes.delete('/arts/delete/:id', ArtsController.delete)

// ArtRoutes.get('/arts/update/:id', ArtsController.updateView)
ArtRoutes.patch('/arts/update/:id', ArtsController.update)

// ArtRoutes.put('/arts/replace/:id',ArtsController.replaceView)
ArtRoutes.put('/arts/:id', ArtsController.replace)
ArtRoutes.get('/arts/:id', ArtsController.getByID)

ArtRoutes.get('/users/', UserController.listAll)

ArtRoutes.get('/users/:id', UserController.getByID)

// ArtRoutes.get('/users/create', UserController.createView)
ArtRoutes.post('/users/', UserController.create)

ArtRoutes.delete('/users/:id', UserController.delete)

// ArtRoutes.get('/users/create', UserController.updateView)
ArtRoutes.patch('/users/:id', UserController.update)
export default ArtRoutes