import { disconnectionHandler } from "../handlers/disconnectHandler.js"
import { sentUsersOnline } from "../handlers/sentUsersOnline.js"

export function disconnect(socket, io) {
    socket.on("disconnect", ()=>{
        disconnectionHandler(socket)
        sentUsersOnline(io)
    })
}