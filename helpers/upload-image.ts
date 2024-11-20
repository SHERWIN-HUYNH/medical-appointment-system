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
      throw new Error('Tải ảnh lên thất bại. Vui lòng thử lại!')
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('Có lỗi xảy ra khi tải ảnh.')
  }
}
