const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { verificarTokenAutorizaicion, verificarTokenAdmin, verificarToken } = require('../middleware/verificarToken');

//Crear Carro
router.post('/', verificarToken, cartController.crearCarro);

//Actualizar Carro
router.put('/:id', verificarTokenAutorizaicion, cartController.actualizarCarro);

//Eliminar Carro
router.delete('/:id', verificarTokenAutorizaicion, cartController.eliminarCarro);

//obtener usuario de carrito
router.get('/find/:userId', verificarTokenAutorizaicion, cartController.obtenerUsuarioCarro);

//Obtener todos los carritos
router.get('/', verificarTokenAdmin, cartController.obtenerCarritos);


module.exports = router;