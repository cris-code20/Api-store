const express = require('express');
const router = express.Router();
const address = require('../controllers/addressController');
const { authenticate, requireAdmin } = require('../middlewares/auth');

router.get('/user/:userId', authenticate,address.getAllByUser);
router.get('/:id', authenticate,address.getById);
router.post('/', authenticate, address.create);
router.put('/:id', authenticate, address.update);
router.delete('/:id',authenticate, address.delete);

module.exports = router;
