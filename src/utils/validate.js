export function validate(value, key, {type, max, min, required, isId}) {
    const errors = []
     
    if(required)
        if(!value) errors.push("is required")

    if(value){

        if(typeof value !== type) errors.push(`not ${type}`) 
        if(typeof value === "string") {

            if(!value.trim().length) errors.push("string is empty")
            if(max)
                if(value.length > max) errors.push("invalid length is more than " + max)
            if(min)
                if(value.length < min) errors.push("invalid length is more than " + min)
        }
        if (isId) {
            if (!/^[0-9a-fA-F]{24}$/.test(value)) errors.push("invalid id")
        }
    }


    if(errors.length)
        return {
            key,
            errors
        }


    return undefined
  
}