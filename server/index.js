import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import {Server} from 'socket.io'
import messageRoute from './routes/messageRoute.js'
import dotenv from 'dotenv/config.js'
import userRoutes from './routes/userRoute.js'


// import { Server } from "socket.io";
//  *
//  * const io = new Server();
//  *
//  * io.on("connection", (socket) => {
//  *   console.log(`socket ${socket.id} connected`);
//  *
//  *   // send an event to the client
//  *   socket.emit("foo", "bar");
//  *
//  *   socket.on("foobar", () => {
//  *     // an event was received from the client
//  *   });
//  *
//  *   // upon disconnection
//  *   socket.on("disconnect", (reason) => {
//  *     console.log(`socket ${socket.id} disconnected due to ${reason}`);
//  *   });
//  * });
//  *
//  * io.listen(3000);

const app = express()
app.use(cors())
app.use(express.json())




mongoose
    .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Succesfull")
}).catch((err) => {
    console.log(err.message);
})

app.use("/api/auth",userRoutes)
app.use("/api/messages", messageRoute)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
});


const io = new Server(server);

global.onlineUsers = new Map();
io.on('connection', (socket) => {
    console.log("a user has been connected")
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})
