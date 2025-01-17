import Messages from "../models/messages.js"
import moment from "moment"

export function initializeNewMessageInstance(sender, receiver, chatId) {
    return new Messages({
        sender: sender._id,
        receiver,
        content: "",
        chatId,
        createdAt: moment()
    })
}