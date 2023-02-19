const { ErrorObject } = require('../helpers/error');
const { verify } = require('../utils/jwt.utils');
const { pusherSessionSocket } = require('../helpers/socketsessions');

module.exports = {
    socketAuth: async (socket,next) => {
        try{
            const { token } =  socket.handshake.auth

           const tokenData = await verify(token)

           

           if(!tokenData) throw new ErrorObject('First Login', 403)


            socket.userId = tokenData.id

           
           pusherSessionSocket(socket.id,socket.userId)

           next()

          

        }catch(err){
            next(err)
        }
    },

}