import Messages from "../models/messages.js";

export async function getMessagesChat(socket, chatId) {
  try {
    const msg = await Messages.find({chatId},{},{
      limit: 10,
      sort: "-createdAt",
    }).lean();
 
    socket.emit("server:get-chat-messages", chatId, msg);
  } catch (error) {
    console.log(error.message, " error en getMessages");
    return;
  }
}
