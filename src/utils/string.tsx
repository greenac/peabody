
export const capitalizeString = (str: string): string => {
  if (str === "") {
    return str
  }

  const firstLetter = str.slice(0, 1)
  return `${firstLetter.toUpperCase()}${str.slice(1, str.length)}`
}
