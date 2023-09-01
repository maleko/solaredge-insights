export function getDateArray(startDate: Date, endDate: Date) {
  const arr = [];

  for (let dt: Date = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  console.log(arr);
  return arr;
}

export function getMonthlyArray(startDate: Date, endDate: Date) {
  const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12
    + endDate.getMonth() - startDate.getMonth() + 1;

  const monthsArray = Array(diffInMonths).fill(null).map((_, index) => {
    const currentMonth = new Date(startDate.getFullYear(), (startDate.getMonth() + index), 1);
    return currentMonth;
  });

  console.log(monthsArray);

  return monthsArray;  
}