var socketsSessions = [];

module.exports = {
    pusherSessionSocket:   (socketId,userId) => {
        socketsSessions.push({socketId,userId})

        console.log(socketsSessions)

 
    
    
    },
    findSocketId: (userId) => {

        

       
        const socketsId = socketsSessions.filter((e) => e.userId === userId)

      

    
        if(socketsId.length > 0) return socketsId
        return false

    },
    disconectSessionSocket: (socketId) => {

        socketsSessions = socketsSessions.filter(e => e.socketId !== socketId)
    }
}