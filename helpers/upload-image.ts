import { FAILED_UPLOAD_IMAGE } from "@/validation/messageCode/uploadImage"

export const uploadFileToCloudinary = async (file: File): Promise<string | null> => {
  const uploadFormData = new FormData()
  uploadFormData.append('file', file)
  uploadFormData.append('upload_preset', 'appointment')

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dbg1rtbcc/upload', {
      method: 'POST',
      body: uploadFormData,
    })

    const data = await response.json()

    if (response.ok) {
      return data.public_id
    } else {
      console.error('Cloudinary upload failed:', data)
      throw new Error(FAILED_UPLOAD_IMAGE)
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error(FAILED_UPLOAD_IMAGE)
  }
}
