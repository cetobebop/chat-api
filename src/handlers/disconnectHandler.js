import { sessionInstance } from "../global/sessionInstance.js";

export function disconnectionHandler(socket) {
    sessionInstance.removeUser(socket.id)
}  