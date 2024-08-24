import { deleteCloudinaryImages, deleteCloudinaryImagesTime } from "./deleteCloudinaryImages"

export default [{
    task: ()=>{console.log("hola")},
    time: "* * * * *"
},
{
    task: deleteCloudinaryImages,
    time: deleteCloudinaryImagesTime
},

]