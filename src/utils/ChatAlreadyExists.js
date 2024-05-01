import User from "../models/user.js";
import Chats from "../models/chats.js";

export async function chatAlreadyExists(data) {
    const {sender, receiver} = data
    let chats
    
    try {
        const user = await User.findOne({nanoId: sender}).populate("chatGroups")

        if(user._id.toString() !== receiver)
        chats = user.chatGroups.find(c => c.users.find(id => id.toString() === receiver))
        
        else if(user._id.toString() === receiver)
        chats = user.chatGroups.find(u => u.users[0].toString() === u.users[1].toString())
    
        if(!chats) return false
        
        const chatFound = await Chats.findById(chats._id)

        return chatFound

    } catch (error) {
        console.log(error.message)
       
    }
}