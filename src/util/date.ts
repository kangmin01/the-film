export function parseDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
