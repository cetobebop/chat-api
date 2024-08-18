import User from "../models/user.js";
import { nanoid } from "nanoid";
import { validate } from "./validate.js";


export default async function (userNanoId) {

  const validation = validate(userNanoId, "userNanoId", {type: "string", min: 20, max: 29, required: true})

  if(!validation) {
    const user = await User.findOne({nanoId: userNanoId})
    if(user) return user
  }

  const nano = nanoid()
  const username = nanoid(4)

  const user = await new User({
    username,
    nanoId: nano,
    userAvatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${username}`
  }).save();

 
  return user
}