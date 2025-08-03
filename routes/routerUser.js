const express = require('express')
const router = express.Router();
const user = require('../controllers/userController')
const { authenticate, requireAdmin } = require('../middlewares/auth');


// rutas


router.get('/',  requireAdmin,user.getAllUsers);
router.get('/:id', requireAdmin, user.getById);
router.post('/', requireAdmin, user.createUser);
router.put('/:id', requireAdmin, user.updateUsers);
router.delete('/:id', requireAdmin, user.deleteUser);


module.exports = router;
