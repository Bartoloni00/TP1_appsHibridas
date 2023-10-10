import express from 'express'
import { UserController } from '../controllers/UsersApiController.js'

const ApiUserRoutes = express.Router()

ApiUserRoutes.get('/users/', UserController.listAll)

ApiUserRoutes.get('/users/:id', UserController.getByID)

ApiUserRoutes.post('/users/', UserController.create)

ApiUserRoutes.delete('/users/:id', UserController.delete)

ApiUserRoutes.patch('/users/:id', UserController.update)

export default ApiUserRoutes