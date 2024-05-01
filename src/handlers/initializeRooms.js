import { firstMessageChat } from "../utils/firstMessageChat.js"
import {countUnreadMessages} from "../utils/unreadMessages.js"

export async function initializeRooms(socket, user) {

    
    const indexedMessageChat = await firstMessageChat(user.chatGroups)

    const unreadMessagesPerChat = await countUnreadMessages(user.chatGroups, user._id)
  
    await user.populate([
        {
            path: 'chatGroups',
            populate:
            [
                { 
                    path: 'users', 
                    select: '-nanoId',
                },
            ]
        },
    ])
  
    const rooms = user.chatGroups

   
    socket.join(user.nanoId.toString())
    rooms.forEach(room => {
        socket.join("room:" + room._id.toString())
    });

    socket.emit("server:my-rooms", rooms, indexedMessageChat, unreadMessagesPerChat)
}