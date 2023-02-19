const { endpointResponse } = require("../helpers/success")
const { createNewMessage, findMessages } = require("../services/message.services")




module.exports = {
    createMessage:  async (req,res,next)  => {
        try{
            const  {senderId, receiverId, message} = req.body

            

            const newMessage = await createNewMessage(
                senderId,
                receiverId,
                message
            )

            if(!newMessage) throw new ErrorObject('Error server',500)

            endpointResponse({
                res,
                code: 201,
                message: 'Submitted  successfully',
                
            })
        }catch(err){
            next(err)
        }
    },

    getMessages: async (req,res,next) => {
        try{
            const {receiverId,senderId,page} = req.query

            const messages = await findMessages(senderId,receiverId,page);

            endpointResponse({
                res,
                code:200,
                message: 'Request successfully',
                body: messages

            })

        }catch(err){
            next(err)
        }
    }
}