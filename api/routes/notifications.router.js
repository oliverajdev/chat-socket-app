const { Router } = require('express');
const { createNotification, getNotifications, getAceptedNotifications, deleteNotifications } = require('../controllers/notificationscontroller');


const router = Router();

router.get('/:userId',getNotifications)
router.delete('/',deleteNotifications)
router.post('/',createNotification)




module.exports = router