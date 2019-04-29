const express = require('express')

const routes = express.Router()

const controller = require('./app/controllers')
const authMiddleware = require('./app/middlewares/auth')

routes.post('/users', controller.UserController.store)
routes.post('/sessions', controller.SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }))
module.exports = routes
