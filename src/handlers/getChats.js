import Chats from "../models/chats.js"


export async function getMessagesChat(socket, data) {
    try {
        const chat = await Chats.findById(data).populate({
            path: 'msg',
            options: { 
                limit: 10,
                sort:'-createdAt' 
            }
        }).lean()
        
        socket.emit("server:get-chat-messages", data, chat.msg)
    } catch (error) {
        console.log(error.message, " error en getMessages")
        return 
    }
}