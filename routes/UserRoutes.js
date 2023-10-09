import express from 'express'
import { UserController } from '../controllers/Users.js'

const UserRoutes = express.Router()

UserRoutes.get('/users/', UserController.listAll)

UserRoutes.get('/users/create', UserController.createView)
UserRoutes.post('/users/create', UserController.create)

UserRoutes.get('/users/delete/:id', UserController.deleteView)
UserRoutes.post('/users/delete/:id', UserController.delete)

UserRoutes.get('/users/update/:id', UserController.updateView)
UserRoutes.post('/users/update/:id', UserController.update)
UserRoutes.get('/users/:id', UserController.getByID)
export default UserRoutes