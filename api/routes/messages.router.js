const { createMessage, getMessages } = require('../controllers/message.controller');
const { Router } = require('express');

const router = Router()

router.get('/',getMessages)
router.post('/',createMessage)


module.exports = router