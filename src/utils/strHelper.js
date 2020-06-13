export const strToUrl = str => {
  const arr = str.split(' ');
  return arr.join('+');
}

export const shortenTitle = str => {
  if (str.length > 51) {
    return `${str.slice(0,50)}...`;
  }
  return str;
}