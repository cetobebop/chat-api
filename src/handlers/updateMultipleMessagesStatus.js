import Messages from "../models/messages.js";

export async function updateMultipleMessagesStatus(chatsIds, user, socket, newStatus) {
  try {
    const arr = newStatus === "received" ? ["read", "received"] : ["read"]

    await Messages.updateMany(
      { chatId: { $in: chatsIds }, receiver: user._id, status: {$nin: arr} },
      { status: newStatus }
    );
    
    chatsIds.forEach(chatId => {
      socket.to(`room:${chatId}`).emit(`server:messages-${newStatus}`, chatId)
    });

  } catch (error) {
    console.log("ha ocurrido un error en updateMultipleMessages")  
  }
}
