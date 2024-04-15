import mongoose from "mongoose";

const {Schema, model} = mongoose;


const msgSchema = new Schema({

    sender:{
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
    content:{
        type: String
    },
    read:{
        type: Boolean,
        default: false
    },
    received:{
        type: Boolean,
        default: false
    },
    
},{
    timestamps: true
})

export default model("Messages", msgSchema)