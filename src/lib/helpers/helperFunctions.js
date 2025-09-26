// Helper to convert ALLCAPS suffix to Capitalized words (e.g., FLEXIBLE → Flexible)
export const formatSuffix = (suffix) => {
  return suffix
    .replace(
      /([A-Z]+)/g,
      (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    )
    .replace(/([A-Z][a-z]+)/g, " $1") // add space before capital words if needed
    .trim();
};

  // Format phone number
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "N/A";
    const cleaned = phoneNumber.toString().replace(/\D/g, "");
    
    if (cleaned.length >= 10) {
      const phone = cleaned.slice(-10);
      const code = cleaned.length > 10 ? "+" + cleaned.slice(0, -10) : "+91";
      
      if (code === "+91") {
        return `${code} ${phone.slice(0, 5)} ${phone.slice(5)}`;
      } else if (code === "+1") {
        return `${code} (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
      } else {
        return `${code} ${phone}`;
      }
    }
    
    return phoneNumber;
  };

  export function camelCaseToNormalText(camelCaseStr) {
  // Handle empty or non-string input
  if (typeof camelCaseStr !== "string" || camelCaseStr.length === 0) {
    return camelCaseStr;
  }

  // Add space before capital letters and trim
  const withSpaces = camelCaseStr.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter of each word
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}