import Messages from "../models/messages.js";

export async function createMessage(data, sender, chat) {
  const { receiver, msg, isAMultimediaFile = false } = data;

  return await new Messages({
    sender: sender._id,
    receiver,
    content: msg,
    chatId: chat._id,
    isAMultimediaFile,
  }).save();
}
