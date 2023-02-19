const { ErrorObject } = require("../helpers/error")
const { endpointResponse } = require("../helpers/success");
const { createNewNotification, findNotificationsByUser, findAceptedNotificationsByUser, deleteUserNotification } = require("../services/notifications.services");
const { findByEmail } = require("../services/users.services");


module.exports = {
    createNotification: async (req,res,next) => {
        try{
            const {followerId,email} = req.body;
     

            const user = await findByEmail(email);

            if(!user) throw new ErrorObject('Email not exist',400);


            const followedId = user.id;

            const notification = await createNewNotification(followerId,followedId);

            if(!notification) throw new ErrorObject('Notifications already exist',400);

            endpointResponse({
                res,
                code:201,
                message:'Notification sent',
                body: notification
            })

        }catch(err){
            next(err)
        }
    },
    getNotifications: async (req,res,next) => {
        try{
            const { userId } = req.params;
            
            const notifications = await  findNotificationsByUser(userId);

            endpointResponse({
                res,
                message:'Request successfully',
                body: notifications
            })

        }catch(err){
            next(err)
        }
    },
    getAceptedNotifications: async (req,res,next) => {
        try{
            const { userId } = req.params;

            const notifications = await findAceptedNotificationsByUser(userId);

            endpointResponse({
                res,
                message:'Request successfully',
                body:notifications
            })

        }catch(err){
            next(err)
        }
    },
    deleteNotifications: async (req,res,next) => {
        try{
            const { followerId, followedId } = req.body;

             const deletedNotification = await deleteUserNotification(followerId,followedId);

             if(!deletedNotification) throw new ErrorObject('Notifications already deleted',400)

            endpointResponse({
                res,
                code:201,
                message:'Notification deleted',
                body: deletedNotification
         
            })

        }catch(err){
            next(err)
        }
    }
}