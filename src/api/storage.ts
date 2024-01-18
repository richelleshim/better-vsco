import { firebaseStorage } from "../global"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { Folder } from "./types"

const path = (...names: string[]) => {
  return names.reduce(
    (path, name) => {
      return ref(path, name)
    },
    ref(firebaseStorage, ""),
  )
}

export const uploadPostImage = async (file: File) => {
  const fileName = uuidv4()
  const imagePath = path(Folder.POST_IMAGES, fileName)
  await uploadBytes(imagePath, file)

  const imageURL = await getDownloadURL(imagePath)
  return imageURL
}

export const uploadProfilePicture = async (file: File) => {
  const fileName = uuidv4()
  const imagePath = path(Folder.PROFILE_PICTURES, fileName)
  await uploadBytes(imagePath, file)
  const imageURL = await getDownloadURL(imagePath)
  return imageURL
}
