function formatDate(date, monthYear = false) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formatterMonthYear = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
  });
  return !monthYear ? formatter.format(date) : formatterMonthYear.format(date);
}

export default formatDate;
