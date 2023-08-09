import { getMessages, addMessage } from "../controllers/messageController.js";
import { Router } from "express";


const messageRoutes = Router()

messageRoutes.post("/addmsg", addMessage)
messageRoutes.post("/getmsg",getMessages)

export default  messageRoutes

