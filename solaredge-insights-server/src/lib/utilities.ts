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

  return monthsArray;  
}

export function getYearlyArray(startDate: Date, endDate: Date) {
  const diffInYears = endDate.getFullYear() - startDate.getFullYear() + 1;

  const yearsArray = Array(diffInYears).fill(null).map((_, index) => {
    const currentYear = new Date(startDate.getFullYear() + index, 0, 1);
    return currentYear;
  });
  return yearsArray;
}
