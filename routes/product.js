const router = require('express').Router();
const productController = require('../controllers/productController');
const { verificarTokenAdmin } = require('../middleware/verificarToken');

//Crear producto
router.post('/', verificarTokenAdmin, productController.crearProducto);

//Actualizar Producto
router.put('/:id', verificarTokenAdmin, productController.actualizarProducto);

//Eliminar producto
router.delete('/:id', verificarTokenAdmin, productController.eliminarProducto);

//obtener producto
router.get('/find/:id', productController.obtenerProducto);

//trae los ultimos 5 usuarios si la query lleva new si no devuelve todos los usuarios
router.get('/', productController.obtenerProductos);

module.exports = router;