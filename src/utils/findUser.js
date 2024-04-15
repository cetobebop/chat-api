import User from "../models/user.js"

export async function findUser(nanoId, _id) {
    let query = nanoId ? {nanoId} : {_id}

    return await User.findOne(query)

}
