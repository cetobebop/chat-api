import Messages from "../models/messages.js"


export async function firstMessageChat(chatsIds) {
   
    const messages = await Messages.aggregate([
        { $match: { chatId: { $in: chatsIds } } },
        { $sort: { createdAt: -1 } },
        { $group: { _id: "$chatId", lastMessage: { $first: "$$ROOT" } } }
    ]);

    const indexMessages = {}

    messages.map(msgChat => {
        indexMessages[msgChat._id] = msgChat.lastMessage
    })

     
    return indexMessages
}