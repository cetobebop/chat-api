import { sessionInstance } from "../global/sessionInstance.js";

export function sentUsersOnline(io){

    io.emit("server:user-online", sessionInstance.getUsers())
}