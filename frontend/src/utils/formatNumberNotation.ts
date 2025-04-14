const formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
});
export const formatNumberNotation = (num: number) => {
  return formatter.format(num);
};
