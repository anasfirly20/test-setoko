export const dateConverter = (dateString: string) => {
  // Create a new Date object using the provided date string
  const dateObject = new Date(dateString);

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day, date, month, and year components from the Date object
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
    dateObject.getUTCDay()
  ];
  const date = dateObject.getUTCDate();
  const month = monthNames[dateObject.getUTCMonth()];
  const year = dateObject.getUTCFullYear();

  // Construct the formatted string
  const formattedString = `${dayName}, ${date} ${month}.`;

  // Return the formatted string
  return formattedString;
};

export function getStringAfterSlash(inputString: string) {
  // Split the input string at the slash
  const parts = inputString.split('/');

  // Check if there is a part after the slash
  if (parts.length > 1) {
      // Return the part after the slash
      return parts[1];
  } else {
      // Return an empty string if there is no part after the slash
      return '';
  }
}