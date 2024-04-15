import singletonUser from "../utils/userSingleton.js";
import { sessionInstance } from "../global/sessionInstance.js";

export async function userHandler (socket) {

    const user = await singletonUser(socket.handshake.auth.token)
   
    const userCopy = JSON.parse(JSON.stringify(user))
    userCopy.sessionId = socket.id
    const {nanoid, ...newUser} = userCopy

    sessionInstance.setUser(newUser)

    socket.emit("server:user", user)

    return user
}