const { Chat } = require('../database/models/index');
const { Op } = require('sequelize')

module.exports = {

    createNewMessage: async (senderId,receiverId,message) =>{

        const newMessage = await Chat.create({
            senderId,
            receiverId,
            message
        }) 

        return newMessage
    },

    findMessages: async (senderId,receiverId,page=0) => {

        const size = 10

        cons
        
        const {count,messages} = await Chat.findAndCountAll({
            where:{
                senderId: {
                    [Op.or]: [senderId, receiverId]
                },
                receiverId: {
                    [Op.or]: [senderId, receiverId]

                },
            },
            order: [['createdAt','DESC']],
            attributes: ['senderId','receiverId','message','createdAt'],
            limit:size,
            offset: page*size,
        })

     

        return {count,messages}

    }
}