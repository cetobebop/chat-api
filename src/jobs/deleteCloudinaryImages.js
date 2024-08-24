import { cloudinaryInstance } from "../global/cloudinaryInstance.js";
import { arrayOfPublicIdsTimesToDelete } from "../utils/arrayOfPublicIdsTimesToDelete.js";

async function deleteCloudinaryImages() {
  try {
    const publics_ids_times_to_delete = arrayOfPublicIdsTimesToDelete();

    for (let i = 0; i <= publics_ids_times_to_delete.length; i++) {
      const result = await cloudinaryInstance.api.delete_resources_by_tag(
        publics_ids_times_to_delete[i],
        { invalidate: true }
      );

      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteCloudinaryImagesTime = "0 12 * * *";


export {
   deleteCloudinaryImages,
   deleteCloudinaryImagesTime
}