export default class DateHelper {
  /**
   * @description
   * Computes ( date2 - date1 ) in months
   *
   * @see https://dev.to/elsyng/react-modal-dialog-using-html-dialog-element-5afk
   *
   * @param date1
   * @param date2
   * @returns
   */
  public static getMonthDifference = (date1: Date, date2: Date) => {
    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();

    return yearDiff * 12 + monthDiff;
  };

  public static isDateInFuture: (date: Date) => boolean = (date: Date) => {
    // Get the current date
    const today = new Date();

    // Compare the two dates
    return date > today;
  };

  public static getMinExportDate: (referenceDate?: Date) => Date = (
    referenceDate?: Date
  ) => {
    if (!referenceDate) {
      referenceDate = new Date();
    }

    // Calculate the month and year three months ago
    let threeMonthsAgoMonth = referenceDate.getMonth() - 3;
    let threeMonthsAgoYear = referenceDate.getFullYear();

    // Adjust the month and year if needed
    if (threeMonthsAgoMonth < 0) {
      threeMonthsAgoMonth += 12;
      threeMonthsAgoYear -= 1;
    }

    // Create a new Date object for three months ago
    const threeMonthsAgoDate = new Date(
      threeMonthsAgoYear,
      threeMonthsAgoMonth,
      referenceDate.getDate()
    );

    return threeMonthsAgoDate;
  };
}
