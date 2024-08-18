export function filterSingleImage (req, file, cb) {
    
    if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
        return cb(new Error("bla"))
    }

    return cb(null, true)
    

}