import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3001"
  }
});
let socialmediaUsers = []
const addnewUser = (user, socketId) => {
  !socialmediaUsers.some(ci => ci.id === socketId) && socialmediaUsers.push({ user, socketId })

}
const removeuser = (socketId) => {
  socialmediaUsers = socialmediaUsers.filter(ci => ci.socketId !== socketId)
}
const getUser = (recievername) => {
  return socialmediaUsers.find(ci => ci.user === recievername)
}

io.on("connection", (socket) => {
  socket.on("userDetails", (user) => {
    addnewUser(user, socket.id)

  })
  socket.on("sendNotifcation", (message, recievername, user) => {
    const reciever = getUser(recievername)
    io.to(reciever.socketId).emit("getNotification", {
      user,
      message,
    });

  })
  socket.on("disconnect", () => {
    removeuser(socket.id)
  })

});

io.listen(5000);