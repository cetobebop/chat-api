import { findUser } from "../utils/findUser.js"
import { validate } from "../utils/validate.js"

export async function chats(socket, io, userSession) {

    
   
    socket.on("client:join-new-chat", async (chatId, callback = ()=>{})=>{
        const errors = validate(chatId,"chatId",{required:true, isId:true, type: "string"})

        if(errors) return callback({
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


    socket.on("client:user-is-writing", async (chatId, callback = ()=>{})=>{
        const errors = validate(chatId,"chatId",{required:true, isId:true, type: "string"})

        if(errors) return callback({
            status: false,
            errors
        })

        const user = await findUser(userSession.nanoId)
        
        const isMyChat = user.chatGroups.find(id => id.toString() === chatId)

        if(!isMyChat) return 

        socket.to(`room:${chatId}`).emit("server:user-is-writing", chatId)
        
        callback({
            status: true
        })
    })
  
    socket.on("client:user-stopped-writing", async (chatId, callback = ()=>{})=>{
        const errors = validate(chatId,"chatId",{required:true, isId:true, type: "string"})
       
       
        if(errors) return callback({
            status: false,
            errors
        })

        const user = await findUser(userSession.nanoId)
        
        const isMyChat = user.chatGroups.find(id => id.toString() === chatId)
    
        if(!isMyChat) return 
        
        
        socket.to(`room:${chatId}`).emit("server:user-stopped-writing", chatId)

        callback({
            status: true
        })
    })
}