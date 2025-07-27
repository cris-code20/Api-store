const express = require('express');
const router = express.Router();
const invoice = require('../controllers/invoiceController');

router.get('/', invoice.getAll);
router.get('/:id', invoice.getById);
router.post('/', invoice.create);
router.delete('/:id', invoice.delete);

module.exports = router;
