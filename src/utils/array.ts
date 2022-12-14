// Taken from here: https://stackoverflow.com/a/46545530
export const shuffle = <T>(array: T[]): T[] => {
  return array
    .map((element) => ({ element, sortIndex: Math.random() }))
    .sort((a, b) => a.sortIndex - b.sortIndex)
    .map(({ element }) => element);
};

export const generateRange = <T>(length: number, generator: (index: number) => T) => {
  return Array(length)
    .fill(undefined)
    .map((_, index) => generator(index));
};
