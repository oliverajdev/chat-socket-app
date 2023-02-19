const {Router} = require('express');
const { 
    getFolloweds, 
    createFollow, 
    deleteFollow} = require('../controllers/follow.controller');

const router = Router();

router.post('/',createFollow)
router.get('/followeds/:userId',getFolloweds)
router.delete('/',deleteFollow)



module.exports = router