export const numberFormat = (number: any) => {
  if (number || number == 0) {
    return number.toLocaleString().replaceAll(",", " ");
  }
  return "";
};
