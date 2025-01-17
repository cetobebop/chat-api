import { createChatRoom } from "../utils/createChatRoom.js"
import { chatAlreadyExists } from "../utils/chatExist.js"
import { createMessage } from "../utils/createMessage.js"
import { removeNanoId } from "../utils/removeNanoId.js"
import { botResponse } from "./botResponse.js"

export async function messageHandler(data, socket, io, sender, receiver, callback, isBotResponse) {
    let chat
    chat = await chatAlreadyExists(data)

    // console.log(sender.nanoId, " id que realizo la peticion")
    // console.log(data.msg, " url que se va a almacenar")
    // console.log("////////////////////")

    if(chat) {
        const newMsg = await createMessage(data, sender, chat)

        if(!isBotResponse) socket.to(`room:${chat._id.toString()}`).emit("server:new-message", chat._id.toString(), newMsg)
        if(isBotResponse) botResponse(newMsg, socket, io, sender, receiver, chat)      
        
        return callback({status: true})
    }
  
    if(isBotResponse) return messageHandler(data, socket, io, sender, receiver, callback, isBotResponse)
    chat = await createChatRoom(sender, receiver)

    const newMsg = await createMessage(data, sender, chat)

    const newChat = JSON.parse(JSON.stringify(chat))
    newChat.receiver = removeNanoId(sender)
    newChat.sender = removeNanoId(receiver)

    socket.to(receiver.nanoId.toString()).emit("server:new-room-new-message", chat._id.toString(), newMsg)
    socket.to(receiver.nanoId.toString()).emit("server:new-room", newChat)
    socket.join(`room:${newChat._id.toString()}`)

    callback({status: true, newChat, newMsg})
     
}