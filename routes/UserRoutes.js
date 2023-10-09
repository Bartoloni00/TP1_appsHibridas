import express from 'express'
import { UserController } from '../controllers/Users.js'

const UserRoutes = express.Router()

UserRoutes.get('/users/', UserController.listAll)

UserRoutes.get('/users/:id', UserController.getByID)

// UserRoutes.get('/users/create', UserController.createView)
UserRoutes.post('/users/', UserController.create)

UserRoutes.post('/users/:id', UserController.delete)

// UserRoutes.get('/users/create', UserController.updateView)
UserRoutes.post('/users/:id', UserController.update)
export default UserRoutes