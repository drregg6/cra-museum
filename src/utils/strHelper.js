export const strToUrl = str => {
  const arr = str.split(' ');
  return arr.join('+');
}