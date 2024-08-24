import { deleteCloudinaryImages, deleteCloudinaryImagesTime } from "./deleteCloudinaryImages.js"

export default [{
    task: ()=>{console.log("hola")},
    time: "* * * * *"
},
{
    task: deleteCloudinaryImages,
    time: deleteCloudinaryImagesTime
},

]