import {botsActive} from "../global/bots.js";

export function findBot (_id){
    
    const botFound = botsActive.find(objt => objt._id.toString() === _id)

    if(botFound) return botFound

    return false

}