export function validateArray(arr, {type}) {
    const errors = []

    if(!arr){
        errors.push("is empty")
    }
    else if(!Array.isArray(arr)){
        errors.push("is not an array")
    }
    else if(Array.isArray(arr)){
        if(!arr.every(a => typeof a === type)){
            errors.push("all elements are not of the same type")
        }
        if(!arr.every(a => a)){
            errors.push("there are null elements")
        }
    }

    return errors
}