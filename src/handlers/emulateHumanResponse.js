import { delayFunction } from "../utils/delayFunction.js";
import { updateMultipleMessagesStatus } from "./updateMultipleMessagesStatus.js";

export async function emulateAnUserResponseWithDelay(chat, userBot, io) {

    
    await delayFunction(2, updateMultipleMessagesStatus, [chat._id], userBot, io, "received")

    await delayFunction(2, updateMultipleMessagesStatus, [chat._id], userBot, io, "read")

    await delayFunction(1, botIsWriting, chat._id, io)

    await delayFunction(5, botStoppedWriting, chat._id, io)

}


function botIsWriting(chatId, io){
    io.to(`room:${chatId}`).emit("server:user-is-writing", chatId)
}

function botStoppedWriting(chatId, io){
    io.to(`room:${chatId}`).emit("server:user-stopped-writing", chatId)
}
