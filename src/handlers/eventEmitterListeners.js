import { sendImageUrlByMessage } from "../utils/sendImageUrlByMessage.js"
import { emitterImageControllerToSocket } from "../global/eventEmitter.js"



export function eventEmitterListeners(io, socket, userSession) {
    const imageUrlByMessage = sendImageUrlByMessage(io, socket, userSession)

 
    emitterImageControllerToSocket.on("server-event-emitter:client-sent-image" + userSession.nanoId, imageUrlByMessage)


    socket.on("disconnect", ()=>{
        console.log("desconectado")
        emitterImageControllerToSocket.removeListener("server-event-emitter:client-sent-image" + userSession.nanoId, imageUrlByMessage)
    })
}


