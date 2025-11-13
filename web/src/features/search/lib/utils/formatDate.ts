export function formatToMonthDay(date: string): string {
  const parsedDate = new Date(date);
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${month}.${day}`;
}
