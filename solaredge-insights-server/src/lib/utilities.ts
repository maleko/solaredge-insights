export function getDateArray(startDate: Date, endDate: Date) {
  const arr = [];

  for (let dt: Date = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  console.log(arr);
  return arr;
}