import { findUser } from "../utils/findUser.js"
import { validate } from "../utils/validate.js"

export function chats(socket, io, userSession) {
   
    socket.on("client:join-new-chat", async (chatId, callback = ()=>{})=>{
        const errors = validate(chatId,"chatId",{required:true, isId:true})
         
        if(errors.length) return callback({
            status: false,
            errors
        })

        const user = await findUser(userSession.nanoId)
        const isMyChat = user.chatGroups.find(id => id.toString() === chatId)
        if(!isMyChat) return 
        
        socket.join(`room:${chatId}`)

        callback({
            status: true
        })
    })


}