const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const { authenticate, requireAdmin } = require('../middlewares/auth');

router.get('/', product.getAll);
router.get('/:id', product.getById);
router.post('/', authenticate, requireAdmin, product.create);
router.put('/:id', authenticate, requireAdmin, product.update);
router.delete('/:id', authenticate, requireAdmin, product.delete);

module.exports = router;
