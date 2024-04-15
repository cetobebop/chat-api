import mongoose from "mongoose";

const {Schema, model} = mongoose;


const userSchema = new Schema({

    nanoId:{
        type: String,
    },
    username:{
        type: String,
    },
    chatGroups:[{
        type: Schema.Types.ObjectId,
        ref: "Chats",
        default: []
    }],
    userAvatar:{
        type: String
    },
    lastSession: {
        type: String,
        default: ""
    }
    ,
    activeSessions:{
        type: Array,
        default: []
    }

})

export default model("Users", userSchema)