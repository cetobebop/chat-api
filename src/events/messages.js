import { getMessagesChat } from "../handlers/getMessageChats.js";
import { messageHandler } from "../handlers/messageHandler.js"
import { updateMultipleMessagesStatus } from "../handlers/updateMultipleMessagesStatus.js";
import { validateMessages } from "../middlewares/validateMessages.js"
import { findUser } from "../utils/findUser.js";
import { validateArray } from "../utils/validateArray.js";



export function messages(socket, io, userSession) {
   
    socket.on("client:sent-message", async (data = {}, callback= ()=>{})=>{

        const error = validateMessages(data)
        
        if(error.length) return callback({status: false})
    
        const receiver = await findUser(undefined, data.receiver)
        if(!receiver) return callback({status: false})
       
        await messageHandler(data, socket, io, userSession, receiver, callback)
      
    })

    socket.on("client:get-chat-messages", (data = {})=>{
        getMessagesChat(socket, data)
    })

    socket.on("client:messages-received", (chatsIds = {})=>{
        const errors = validateArray(chatsIds, {type: "string"})
       
        if(errors.length) return

        updateMultipleMessagesStatus(chatsIds, userSession, socket, "received")
    })

    socket.on("client:messages-read", (chatsIds = {})=>{
        const errors = validateArray(chatsIds, {type: "string"})
        if(errors.length) return

        

        updateMultipleMessagesStatus(chatsIds, userSession, socket, "read")
    })
}