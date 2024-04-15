import Chat from "../models/chats.js";

export async function createChatRoom(sender, receiver, newMsg) {
   

    const newChat = await Chat({users:[sender._id, receiver._id], msg: [newMsg._id]}).save()

    if(sender._id.toString() !== receiver._id.toString()){
        sender.chatGroups.push(newChat._id)
        receiver.chatGroups.push(newChat._id)

        await sender.save()
        await receiver.save()
    }
    else if(sender._id.toString() === receiver._id.toString()){
        sender.chatGroups.push(newChat._id)
        await sender.save()
    }

    

    return newChat
}