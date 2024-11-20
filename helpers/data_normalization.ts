export const capitalizeWords = (text: string) => {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const charCode = event.key
  if (!/^\d$/.test(charCode)) {
    event.preventDefault()
  }
}

export const isValidIdentificationNumber = (identificationNumber: string) => {
  const idPattern = /^[0-9]{6,12}$/
  return idPattern.test(identificationNumber)
}

export const capitalizeFirstLetterOfSentence = (str: string) => {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
