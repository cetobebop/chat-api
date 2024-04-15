import { validate } from "../utils/validate.js";

export function validateMessages(data) {
    const {sender, receiver, msg} = data
    const error = []
    
    error
        .push(
            validate(sender, "sender", {type: "string", required: true}),
            validate(receiver, "receiver", {type: "string", required: true, isId: true}),
            validate(msg, "msg", {type: "string", required: true})
        )

    return error.filter(e => e !== undefined)
}