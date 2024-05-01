import Messages from "../models/messages.js";


export async function createMessage(data, sender, chat) {
    const {receiver, msg} = data
    
    return await new Messages({sender: sender._id, receiver, content: msg, chatId: chat._id}).save()
}