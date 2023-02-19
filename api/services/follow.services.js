const { Op } = require('sequelize');
<<<<<<< HEAD
const {  Follow, sequelize } = require('../../api/database/models/index');
=======
const { User, Follow, Chat, sequelize } = require('../../api/database/models/index');
>>>>>>> 437c78ad2a3ca8ebcde187afd468b0bb41bc55ed


module.exports = {
    findFollowedsUserById: async (userId) => {

<<<<<<< HEAD
        return await sequelize.query(`SELECT f.followedId , cf.message, cf.senderId, cf.receiverId FROM Follows f
        LEFT JOIN (
        SELECT c.message, c.createdAt, c.senderId, c.receiverId
        FROM Chats c
        ORDER BY c.createdAt DESC
        ) cf
        ON cf.senderId = f.followerId or cf.receiverId = f.followerId
        WHERE f.followerId =${userId}
        GROUP BY followedId
        
=======
        return await sequelize.query(`SELECT follow.followedId as userId ,   user.firstName, user.lastName, chat.message, chat.senderId, chat.receiverId , chat.createdAt FROM Follows as follow
        INNER JOIN Users   as user
        ON user.id = follow.followedId
        LEFT JOIN (
        select  c.message,c.senderId,c.receiverId, c.createdAt
        from (select c.*,
                     row_number() over (partition by least(c.senderId, c.receiverId), greatest(c.senderId, c.receiverId) order by c.id desc) as userId
              from Chats c
             ) c
             where userId = ${userId}
        ) as chat ON chat.receiverId = user.id or chat.senderId = user.id
        WHERE follow.followerId = ${userId}
        GROUP BY follow.followedId
        ORDER BY chat.createdAt DESC
>>>>>>> 437c78ad2a3ca8ebcde187afd468b0bb41bc55ed
        
        `,{
          type: sequelize.QueryTypes.SELECT,

        })
    },

    createNewFollow: async (followerId,followedId) => {

        return await Follow.bulkCreate([
          {
            followedId,
            followerId
          },
          {
            followedId: followerId,
            followerId: followedId
          }
        ])

        

    },
    deleteFollow: async (followerId,followedId) => {

      return await Follow.destroy({
        where:{
          [Op.or]:[
            {
              followedId,
              followerId
            },
            {
              followedId: followerId,
              followerId: followedId
            }

          ]
          
        }
      })

      

  }
}