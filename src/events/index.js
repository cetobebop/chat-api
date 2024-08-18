import { userHandler } from "../handlers/userHandler.js"
import { disconnect } from "./disconnect.js"
import { sentUsersOnline } from "../handlers/sentUsersOnline.js"
import { messages } from "./messages.js"
import { initializeRooms } from "../handlers/initializeRooms.js"
import { chats } from "./chats.js"
import { bots } from "./bots.js"
import { eventEmitterListeners } from "../handlers/eventEmitterListeners.js"

export default async function (io){

    io.on("connection", async (socket)=>{
        let userSession
      
        userSession = await userHandler(socket)
       
        initializeRooms(socket, userSession)
        
        sentUsersOnline(io)

        disconnect(socket, io, userSession)

        messages(socket, io, userSession)

        chats(socket, io, userSession)
        
        bots(socket, io, userSession)

        eventEmitterListeners(io, socket, userSession)
    })

}   
