import { disconnectionHandler } from "../handlers/disconnectHandler.js"
import { sentUsersOnline } from "../handlers/sentUsersOnline.js"

export function disconnect(socket, io, userSession) {
    socket.on("disconnect", ()=>{
        disconnectionHandler(socket, io, userSession)
        sentUsersOnline(io)
    })
}