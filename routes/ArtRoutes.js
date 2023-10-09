import express from 'express'
import { ArtsController } from '../controllers/Art.js'
import UserRoutes from './UserRoutes.js'

const ArtRoutes = express.Router()

ArtRoutes.get('/', ArtsController.home)

ArtRoutes.get('/arts/', ArtsController.listAll)


ArtRoutes.get('/arts/create', ArtsController.createView)
ArtRoutes.post('/arts/create', ArtsController.create)

ArtRoutes.get('/arts/delete/:id', ArtsController.deleteView)
ArtRoutes.post('/arts/delete/:id', ArtsController.delete)

ArtRoutes.get('/arts/update/:id', ArtsController.updateView)
ArtRoutes.post('/arts/update/:id', ArtsController.update)
ArtRoutes.get('/arts/:id', ArtsController.getByID)

ArtRoutes.use(UserRoutes)
export default ArtRoutes