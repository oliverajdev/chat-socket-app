const { userLogin, userRegister } = require('../controllers/auth.controller');
const {Router} = require('express')

const router = Router();

router.post('/login',userLogin)
router.post('/register',userRegister)

module.exports = router