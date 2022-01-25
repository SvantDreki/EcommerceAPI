const router = require('express').Router();
const authController = require('../controllers/authController')

router.post('/', authController.autenticarUsuario)

module.exports = router;