const express = require('express')
const router = express.Router();
const user = require('../controllers/userController')
const { authenticate, requireAdmin } = require('../middlewares/auth');


// rutas


router.get('/',  authenticate, requireAdmin,user.getAllUsers);
router.get('/:id',authenticate, requireAdmin, user.getById);
router.post('/',authenticate, requireAdmin, user.createUser);
router.put('/:id',authenticate, requireAdmin, user.updateUsers);
router.delete('/:id',authenticate, requireAdmin, user.deleteUser);


module.exports = router;
