const express = require('express');
const router = express.Router();
const invoice = require('../controllers/invoiceController');
const { authenticate, requireAdmin } = require('../middlewares/auth');


router.get('/',authenticate, invoice.getAll);
router.get('/:id', authenticate, invoice.getById);
router.post('/',  authenticate, requireAdmin,invoice.create);
router.delete('/:id', authenticate, requireAdmin,invoice.delete);

module.exports = router;
