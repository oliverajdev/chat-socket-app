const {Router} = require('express')

const router = Router();


const Auth = require('./auth.router')
const Follow = require('./follows.router')
const Message = require('./messages.router')
const User = require('./user.router')
const Notification = require('./notifications.router')

router.use('/auth', Auth)
router.use('/follow', Follow)
router.use('/message', Message)
router.use('/user', User)
router.use('/notification', Notification)



module.exports = router