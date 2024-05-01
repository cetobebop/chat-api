import mongoose from "mongoose";

const {Schema, model} = mongoose;


const chatSchema = new Schema({

    users:[{
        type: Schema.Types.ObjectId,
        ref: "Users",
    }],
    lastRead:{
        type: Array,
        default: []
    },
    activeSessions:{
        type: Array,
        default: []
    }

})

export default model("Chats", chatSchema)