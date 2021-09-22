export default function setDate(date: Date | string) {
  const newDate = new Date(date);
  newDate.setHours(20, 0, 0, 0);
  return newDate;
}

