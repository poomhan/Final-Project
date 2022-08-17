export const padString = (value, padChar, length = 2) => {
  return String(value).padStart(length, padChar)
}
