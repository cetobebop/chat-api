import { createChatRoom } from "../utils/createChatRoom.js"
// import { chatAlreadyExists } from "../utils/chatAlreadyExists.js"
import { createMessage } from "../utils/createMessage.js"
import { removeNanoId } from "../utils/removeNanoId.js"

export async function messageHandler(data, socket, io, sender, receiver, callback) {
    let chat
    // chat = await chatAlreadyExists(data)
    
    
    if(chat) {
        const newMsg = await createMessage(data, sender, chat)
        socket.to(`room:${chat._id.toString()}`).emit("server:new-message", chat._id.toString(), newMsg)   
        return callback({status: true})
    }

    chat = await createChatRoom(sender, receiver)
    
    const newMsg = await createMessage(data, sender, chat)

    const newChat = JSON.parse(JSON.stringify(chat))
    newChat.receiver = removeNanoId(sender)
    newChat.sender = removeNanoId(receiver)

    socket.to(receiver.nanoId.toString()).emit("server:new-room-new-message", chat._id.toString(), newMsg)
    socket.to(receiver.nanoId.toString()).emit("server:new-room", newChat)
    socket.join(`room:${newChat._id.toString()}`)

    callback({status: true, newChat})
     
}