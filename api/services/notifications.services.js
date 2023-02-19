
const {Notifications,  sequelize} = require("../database/models/index")



module.exports = {
    createNewNotification: async (followerId,followedId) => {
          return await Notifications.findOrCreate({
           where:{
            followerId,
            followedId,
           },
           default:{
            followerId,
            followedId,
           }
        })

    },
    aceptedNotification: async (followerId,followedId) => {
        return await Notifications.update({ statusId: 2 }, {
            where: {
              followedId,
              followerId
            }
          })


    },

    
    aceptedUserNotification: async (followerId,followedId) => {

        return await Notifications.update({
            statusId: 2
        },
            {
            where:{
                followerId,
                followedId
            },
        })
    },

    deleteUserNotification: async (followerId,followedId) => {

        return await Notifications.destroy({
            where:{
                followerId,
                followedId
            },
    })
    },
    findNotificationsByUser: async (followedId) => {

        return await sequelize.query(`SELECT 
        IF(s.id = ${followedId} , sf.firstName , s.firstName) AS firstName,
        IF(s.id = ${followedId} , sf.lastName , s.lastName) AS lastName,
        IF(s.id = ${followedId} , sf.email , s.email) AS email,
        n.statusId
        FROM Users s
         JOIN Notifications n
        ON s.id = n.followedId or  n.followerId = s.id
        INNER JOIN Users sf
        ON IF(s.id = n.followerId, sf.id = n.followedId , sf.id = followerId)
        WHERE s.id = ${followedId}`,
        {
            
            type: sequelize.QueryTypes.SELECT
          }
        );
    },
   
}