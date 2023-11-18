export class TimeUtils {
  static formatTimeStamp = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC",
    });

    return formattedDate;
  };
}
