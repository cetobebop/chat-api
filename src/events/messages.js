import { getMessagesChat } from "../handlers/getChats.js";
import { messageHandler } from "../handlers/messageHandler.js"
import { validateMessages } from "../middlewares/validateMessages.js"
import { findUser } from "../utils/findUser.js";



export function messages(socket, io, userSession) {
   
    socket.on("client:sent-message", async (data = {}, callback= ()=>{})=>{

        const error = validateMessages(data)
        console.log(error)
        if(error.length) return callback({status: false})
    
        const receiver = await findUser(undefined, data.receiver)
        if(!receiver) return
       
        await messageHandler(data, socket, io, userSession, receiver, callback)
      
    })

    socket.on("client:get-chat-messages", (data = {})=>{
        getMessagesChat(socket, data)
    })
}