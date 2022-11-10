const getFirstLastName = (first: string, last: string) =>
  [first, last].filter(Boolean).join(' ');

export default getFirstLastName;
