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
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    dateObject.getUTCDay()
  ];
  const date = dateObject.getUTCDate();
  const month = monthNames[dateObject.getUTCMonth()];
  const year = dateObject.getUTCFullYear();

  // Construct the formatted string
  const formattedString = `${dayName} ${date} ${month}`;

  // Return the formatted string
  return formattedString;
};
