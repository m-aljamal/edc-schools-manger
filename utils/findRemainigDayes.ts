export const findRemainigDayes = (date, endDate) => {
  var diff = Math.abs(date.getTime() - endDate.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
};
