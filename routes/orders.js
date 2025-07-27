const express = require('express');
const router = express.Router();
const order = require('../controllers/orderController');

router.get('/', order.getAll);
router.get('/:id', order.getById);
router.post('/', order.create);
router.put('/:id', order.update);
router.delete('/:id', order.delete);

module.exports = router;
