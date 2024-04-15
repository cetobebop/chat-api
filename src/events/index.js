
import { userHandler } from "../handlers/userHandler.js"
import { disconnect } from "./disconnect.js"
import { sentUsersOnline } from "../handlers/sentUsersOnline.js"
import { messages } from "./messages.js"
import { initializeRooms } from "../handlers/initializeRooms.js"
import { chats } from "./chats.js"

export default function (io){

    io.on("connection", async (socket)=>{
        let userSession
      
        userSession = await userHandler(socket)
       
        initializeRooms(socket, userSession)
        
        sentUsersOnline(io)

        disconnect(socket, io)

        messages(socket, io, userSession)

        chats(socket, io, userSession)
        
    })

}