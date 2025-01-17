import { config } from "dotenv"
import { HfInference } from "@huggingface/inference"

import { delayFunction } from "../utils/delayFunction.js"
import { updateMultipleMessagesStatus } from "../handlers/updateMultipleMessagesStatus.js"
import { initializeNewMessageInstance } from "../utils/initializeNewMessageInstance.js"
import { chatAlreadyExists } from "../utils/chatExist.js"
import { findUser } from "../utils/findUser.js"


config()

const hf = new HfInference(process.env.HF_TOKEN)


export default async function mistralResponse(data, io, socket) {

    const chat = await chatAlreadyExists(data)

    const mistralBot = await findUser(null, data.receiver)
    const user = await findUser(data.sender)
    

    await delayFunction(2, updateMultipleMessagesStatus, [chat._id], mistralBot, io, "received")

    await delayFunction(2, updateMultipleMessagesStatus, [chat._id], mistralBot, io, "read")

    textGeneration(data, chat, io, socket, user, mistralBot)



}

async function textGeneration(data, chat, io, socket, user, mistralBot) {

    const newMsg = initializeNewMessageInstance(mistralBot._id, user._id, chat._id)
   
    let i = 0

    for await (const chunk of hf.chatCompletionStream({
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [{ role: "user", content: data.msg }],
        max_tokens: 120,
    })) {

        newMsg.content += chunk.choices[0]?.delta?.content || ""

        if(!i) io.to(`room:${chat._id.toString()}`).emit("server:new-message", chat._id.toString(), newMsg)
        else io.to(`room:${chat._id.toString()}`).emit("server:new-message-stream:" + user.nanoId, chat._id.toString(), newMsg)
        i++
    }

    newMsg.save()

}





