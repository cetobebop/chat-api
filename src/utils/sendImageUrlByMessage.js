 import { messageHandler } from "../handlers/messageHandler.js";

export function sendImageUrlByMessage(io, socket, userSession) {
  return async function (data, receiver) {
      
  

      await messageHandler(data, socket, io, userSession, receiver, (res) => {
        if(res.newChat) socket.emit("server:new-chat-id-to-image-message", res.newChat, res.newMsg)
      })
      
  };



}
