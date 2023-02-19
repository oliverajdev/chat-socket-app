const { ErrorObject } = require("../helpers/error")
const { endpointResponse } = require("../helpers/success")
const { findFollowedsUserById, createNewFollow, deleteFollow } = require("../services/follow.services")
const {  aceptedUserNotification } = require("../services/notifications")

module.exports = {
    getFolloweds: async (req,res,next) => {
        try{
            const { userId } = req.params

           const followeds =  await findFollowedsUserById(userId)


           endpointResponse({
            res,
            message: 'Successful request',
            body: followeds
           })
            
        }catch(err){
            next(err)
        }
    },
    createFollow: async (req,res,next) => {
        try{
            console.log(req.body)
            const  { followerId, followedId } = req.body

        

            const follow = await createNewFollow(followerId,followedId)
            if(follow) await aceptedUserNotification(followerId,followedId)
            


            if(!follow) throw new ErrorObject('Follow already exist',400)
            
            endpointResponse({
                res,
                code:201,
                message:'Follow created',
                body: follow
            })

        }catch(err){
            next(err)
        }
    },
    deleteFollow: async (req,res,next) => {
        try{
            const  { followerId, followedId } = req.body

            const deletefollow = await deleteFollow(followerId,followedId)
     

            if(!deletefollow) throw new ErrorObject('Follower already deleted',400)
            
            endpointResponse({
                res,
                code:201,
                message:'Follow deleted',
                body: deletefollow
            })

        }catch(err){
            next(err)
        }
    },


    
}