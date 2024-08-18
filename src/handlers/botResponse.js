import { emulateAnUserResponseWithDelay } from "./emulateHumanResponse.js"

export function botResponse(newMsg, socket, io, sender, receiver, chat) {

    emulateAnUserResponseWithDelay(chat, sender, io).then(()=>{
        io.to(`room:${chat._id.toString()}`).emit("server:new-message", chat._id.toString(), newMsg)
    })
}