export const parseErrorMessage = (errorMessage: string) => {
  if (!errorMessage) return ''

  return errorMessage.replace('Error:', '')
}
