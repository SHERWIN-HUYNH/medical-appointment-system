export async function convertFileFromUrl(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  const fileName = url.split('/').pop() || 'file'
  const file = new File([blob], fileName, { type: blob.type })
  return file
}
