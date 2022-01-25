const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { verificarTokenAutorizaicion, verificarTokenAdmin, verificarToken } = require('../middleware/verificarToken');

//Crear Orden
router.post('/', verificarToken, orderController.crearOrder);

//Actualizar Carro
router.put('/:id', verificarTokenAdmin, orderController.actualizarOrder);

//Eliminar Carro
router.delete('/:id', verificarTokenAdmin, orderController.eliminarOrder);

//obtener usuario de carrito
router.get('/find/:userId', verificarTokenAutorizaicion, orderController.obtenerUsuarioOrdenes);

//Obtener todos los carritos
router.get('/', verificarTokenAdmin, orderController.obtenerOrdenes);

router.get('/income', verificarTokenAdmin, orderController.obtenerStats )


module.exports = router;