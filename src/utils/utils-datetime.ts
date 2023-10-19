export function getYearFromDate(date: string): string | Error {
  const year = date.match(/\d{4}/i);
  return year ? year[0] : new Error("некорректный формат даты");
}
