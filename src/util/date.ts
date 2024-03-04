export function parseDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function parseDateToUs(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
}

export function getDateDifference(
  dateString1: string,
  dateString2: string
): number {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const dateOnly1 = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );
  const dateOnly2 = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );

  const differenceInMilliseconds = Math.abs(
    dateOnly2.getTime() - dateOnly1.getTime()
  );

  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return differenceInDays;
}
