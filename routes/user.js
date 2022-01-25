const router = require('express').Router();
const userController = require('../controllers/userController');
const { verificarTokenAutorizaicion, verificarTokenAdmin } = require('../middleware/verificarToken');

//Registrar usuario
router.post('/registrar', userController.crearUsuario);

//Actualizar usuario
router.put('/:id', verificarTokenAutorizaicion, userController.actualizarUsuario);

//Eliminar usuario
router.delete('/:id', verificarTokenAutorizaicion, userController.eliminarUsuario);

//obtener usuario
router.get('/find/:id', verificarTokenAdmin, userController.obtenerUsuario);

//trae los ultimos 5 usuarios si la query lleva new si no devuelve todos los usuarios
router.get('/', verificarTokenAdmin, userController.obtenerUsuarios);

//obtiene el total de usuario registrado por mes
router.get('/stats', verificarTokenAdmin, userController.obtenerStats);

module.exports = router;