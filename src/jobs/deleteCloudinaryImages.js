import { cloudinaryInstance } from "../global/cloudinaryInstance.js"
import { arrayOfPublicIdsTimesToDelete } from "../utils/arrayOfPublicIdsTimesToDelete.js"

async function deleteCloudinaryImages() {
    try {
        const publics_ids_times_to_delete = arrayOfPublicIdsTimesToDelete()

        const result = await cloudinaryInstance.uploader
        .destroy(publics_ids_times_to_delete, { invalidate: true})
    
     
        console.log(result)
     } catch (error) {
        console.log(error)
     }
}

const deleteCloudinaryImagesTime = "0 0 * * *"