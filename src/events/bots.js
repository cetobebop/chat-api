import { findBot } from "../handlers/findBot.js"
import { validateMessages } from "../middlewares/validateMessages.js"
import botsResponses from "../bots/index.js"
import { messageHandler } from "../handlers/messageHandler.js"
import { findUser } from "../utils/findUser.js"


export async function bots(socket, io, userSession) {


   
    socket.on("client:message-to-bot", async (data, callback = ()=>{})=>{
       
        const error = validateMessages(data)
     
        if(error.length) return callback({status: false})            
        
        const receiver = await findUser(data.sender)

        if(!receiver) return callback({status: false})   
        
        const botFound = findBot(data.receiver)

        // console.log(botFound, " botfound")

        if(!botFound) return callback({status: false})
         
        const botResponse = botsResponses[botFound.nanoId]

        const res = await botResponse(data, io, socket)

        if(!res) return 

        data = {
            receiver: receiver._id.toString(),
            sender: botFound.nanoId,
            msg: res
        }
        
        
        messageHandler(data, socket, io, botFound, receiver, callback, true)
    })


  
}