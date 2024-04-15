import Messages from "../models/messages.js";


export async function createMessage(data, sender) {
    const {receiver, msg} = data
    
    return await new Messages({sender: sender._id, receiver, content: msg}).save()
}