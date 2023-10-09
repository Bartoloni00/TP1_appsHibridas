import express from 'express'
import { UserController } from '../controllers/UsersApiController.js'

const ApiUserRoutes = express.Router()

ApiUserRoutes.get('/users/', UserController.listAll)// listo

ApiUserRoutes.get('/users/:id', UserController.getByID)// listo

ApiUserRoutes.post('/users/create', UserController.create)// listo

ApiUserRoutes.delete('/users/delete/:id', UserController.delete)// listo

ApiUserRoutes.patch('/users/update/:id', UserController.update)// listo

export default ApiUserRoutes