import Messages from "../models/messages.js";

export async function countUnreadMessages (chatsId, userId){
    const obj = {}
    try {
        const unreadMsgCount = await Messages.aggregate([
            {
                $match: {chatId: { $in: chatsId }, status: "received", receiver: userId},
            },
            {
                $group: {_id: "$chatId", unreadMsgCount: {$count: {}}}
            }
        ]) 
        
        unreadMsgCount.map((msg)=>{
            obj[msg._id] = msg.unreadMsgCount
        })
        return obj

    } catch (error) {
        console.log("hubo un error en la cuenta unreadMessages")
    }

}