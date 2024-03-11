export default class StringHelper {
  public static deNull(value?: string | null, defaultValue?: string | null) {
    if (!value || value === "") return defaultValue ?? "";

    return value;
  }

  public static dotSeparate(texts: string[]) {
    return texts.join(" • ");
  }

  public static stripUnderscores(value?: string | null) {
    if (!value || value.length < 2) return value;

    const valArr = value.split("_");
    const capped = valArr.map(
      (val) => `${val[0].toUpperCase()}${val.slice(1)}`
    );
    return capped.join(" ");
  }

  public static stripHyphens(value?: string | null) {
    if (!value || value.length < 2) return value;

    const valArr = value.split("-");
    const capped = valArr.map(
      (val) => `${val[0].toUpperCase()}${val.slice(1)}`
    );
    return capped.join(" ");
  }

  public static parseDate(isoString?: string | null) {
    if (!isoString) return "";

    return new Date(isoString).toLocaleDateString();
  }

  public static camelCaseToSentenceCase(input?: string | null) {
    if (!input || input.length < 1) return input;

    // Add space before uppercase letters and convert to lowercase
    return input.replace(/([A-Z])/g, " $1").toLowerCase();
  }

  public static camelCaseToTitleCase(inputString?: string | null) {
    if (!inputString || inputString.length < 1) return inputString;

    // Add a space before each capital letter
    const titleCaseString = inputString.replace(/([A-Z])/g, " $1");

    // Capitalize the first character and trim any leading spaces
    return (
      titleCaseString.charAt(0).toUpperCase() + titleCaseString.slice(1).trim()
    );
  }
}
