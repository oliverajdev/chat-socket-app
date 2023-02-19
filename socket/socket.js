const { Server } = require('socket.io');
const http = require('http');
const app = require('../app');
const { socketAuth } = require('../api/midleware/socket.midleware');
const { disconectSessionSocket, findSocketId } = require('../api/helpers/socketsessions');

const server = http.createServer(app)


const corsOptions = {
    cors:{
        origin: '*'
    }
}

const io = new Server(server,corsOptions);


io.use(socketAuth)

io.on('connection', (socket) => {

  const socketId = socket.id



  
  socket.on("notifications", ({notification,to}) => {

    console.log(notification,to)

    const socketsId = findSocketId(to)

    if(socketsId){
    
     socketsId.map(e => {
      console.log(e.socketId)
      socket.to(e.socketId).emit("notifications", {
        notification
      });

     })
    }

     })
  
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
  });
    
  socket.on("private message", ({ message, to }) => {

    console.log(message,to)
      
     const socketsId = findSocketId(to)

     

     if(socketsId){
     
      socketsId.map(e => {

        console.log(e)

          socket.to(e.socketId).emit("private message", {
              message,
              from: socket.userId,
            });
      })
     }


    });


  socket.on("disconnect", () => {
      console.log('disconnect', socketId)
      disconectSessionSocket(socketId)
    });

})



module.exports = server
