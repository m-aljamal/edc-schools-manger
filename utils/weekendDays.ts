export const checkWeekDays = (date, day) => {
  const weekend = new Date(date.getFullYear(), date.getMonth(), day);
  if (weekend.getDay() == 4 || weekend.getDay() == 5) {
    return true;
  }
};

 
 export const setViewDate = (date)=>{
   return new Date(date).toLocaleDateString("ar-SY", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}