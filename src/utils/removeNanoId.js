export function removeNanoId(user) {
    const {nanoId, ...newObj} = JSON.parse(JSON.stringify(user))
    return newObj
}