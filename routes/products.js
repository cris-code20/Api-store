const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, requireAdmin } = require('../middlewares/auth');
const upload = require('../middlewares/upload'); // ✅ NUEVO

// Rutas públicas
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Rutas de admin con upload de imagen
router.post('/', 
  authenticate, 
  requireAdmin, 
  upload.single('image'), // ✅ 'image' es el nombre del campo en el form
  productController.create
);

router.put('/:id', 
  authenticate, 
  requireAdmin, 
  upload.single('image'), // ✅ Opcional en update
  productController.update
);

router.delete('/:id', 
  authenticate, 
  requireAdmin, 
  productController.delete
);

module.exports = router;