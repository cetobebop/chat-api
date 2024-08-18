import { sessionInstance } from "../global/sessionInstance.js";



export function disconnectionHandler(socket, io, userSession) {
    sessionInstance.removeUser(socket.id)
    
}  