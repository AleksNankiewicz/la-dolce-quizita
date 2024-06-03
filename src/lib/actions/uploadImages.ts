import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../firebase'
export const uploadFilesToFirebase = async (files: File[] | string[]) => {
  console.log(files)
  const storage = getStorage(app)
  const uploadedImageRefs: string[] = []

  await Promise.allSettled(
    files.map(async (file: File | string, index: number) => {
      try {
        if (file == 'undefined') return ''
        if (typeof file === 'string') {
          uploadedImageRefs[index] = file
          return
        }
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)

        await uploadBytes(storageRef, file)

        const url = await getDownloadURL(storageRef)
        uploadedImageRefs[index] = url
        console.log(`File ${fileName} uploaded successfully.`)
      } catch (error) {
        console.error(`Error uploading file ${file}: ${error}`)
      }
    })
  )
  console.log(uploadedImageRefs)
  return uploadedImageRefs
}

///nie weim c o to

export const uploadImages = async (formData: any) => {
  // Array to store files

  const formDataArray: [string, FormDataEntryValue][] = Array.from(
    formData.entries()
  )

  // Sort the FormData entries based on the numerical part of the name
  formDataArray.sort(([keyA], [keyB]) => {
    const indexA = parseInt(keyA.split('-')[1])
    const indexB = parseInt(keyB.split('-')[1])
    return indexA - indexB
  })

  // Construct a new FormData object with the sorted entries
  const sortedFormData: FormData = new FormData()
  formDataArray.forEach(([key, value]) => {
    sortedFormData.append(key, value)
  })
  const files: File[] = Array.from(sortedFormData.values()) as File[]

  // Log the sorted FormData object
  //return console.log(sortedFormData)

  // return console.log(files)
  // return files

  const imageRefs = await uploadFilesToFirebase(files)

  // Log all files
  return imageRefs
}
