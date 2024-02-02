const jwt = require('jsonwebtoken')
const { showUsers, createUser, verificarCredenciales } = require('../services/indexServices')

const indexController = {
    show: async (req, res) => {
        try {
            const Authorization = req.header('Authorization')
            const token = Authorization.split('Bearer ')[1]
            jwt.verify(token, 'az_AZ')
            const { email } = jwt.decode(token)
            const usuario = await showUsers(email)
            res.status(200).send(usuario[0])
        } catch (e) {
            res.send(e.message)
        }
    },

    create: async (req, res) => {
        try {
            const { email, password, rol, lenguage } = req.body
            await createUser(email, password, rol, lenguage)
            res.send('se ha añadido el usuario ' + email)
        } catch (error) {
            res.send(error.message)
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const token = jwt.sign({ email }, 'az_AZ', {expiresIn: '1h'}) 
            await verificarCredenciales(email, password)
            res.send(token)
        } catch (err) {
            res.status(404).send(err.message)
        }
    }
}

module.exports = indexController