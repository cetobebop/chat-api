import { deleteCloudinaryImages, deleteCloudinaryImagesTime } from "./deleteCloudinaryImages.js"
import { reloadWebsite, reloadWebsiteTime } from "./requestToMyServer.js"

export default [{
    task: ()=>{console.log("hola")},
    time: "* * * * *"
},
{
    task: deleteCloudinaryImages,
    time: deleteCloudinaryImagesTime
},
{
    task: reloadWebsite,
    time: reloadWebsiteTime
},
]