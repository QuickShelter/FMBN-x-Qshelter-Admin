function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);

  // Format the date using the options
  const formattedDate = date.toLocaleDateString("en-GR", {
    month: "short",
    year: "numeric",
  });

  // Get the day of the month and add the appropriate suffix (e.g., 1st, 2nd, 3rd)
  const day = date.getDate();
  const daySuffix = getDaySuffix(day);

  // Construct the final formatted date
  const finalFormattedDate = `${day}${daySuffix} ${formattedDate}`;

  return finalFormattedDate;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

class NairaFormatter {
  public format(value?: number | null) {

    try {
      return `₦${new Intl.NumberFormat("en-US", {
        style: "decimal",
      }).format(value ? value : 0)}`;
    } catch (error) {
      console.log(error)
      return value ? value : 'N/A'
    }
  }
}

class DateFormatter {
  public format(value: string | null) {
    if (value == null) return "N/A";

    return formatDate(value);
  }
}

export default class FormatHelper {
  public static percentageFormatter = new Intl.NumberFormat("en-GB", { style: "percent" });
  public static dateFormatter = new DateFormatter();
  public static dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC'
  });

  public static numberFormatter = new Intl.NumberFormat("en-GB");
  public static nairaFormatter = new NairaFormatter();
  public static dollarFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
}
