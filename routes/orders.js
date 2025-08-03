const express = require('express');
const router = express.Router();
const order = require('../controllers/orderController');
const { authenticate, requireAdmin } = require('../middlewares/auth');


router.get('/', authenticate, order.getAll); 
router.get('/:id', authenticate, order.getById);
router.post('/', authenticate, order.create);
router.put('/:id', authenticate, order.update);
router.delete('/:id', authenticate, order.delete);

module.exports = router;
