export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // hour12: true,
    // timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
};

export const formatVideoViewsCount = (viewsCount) => {
  if (viewsCount <= 4) return "K";
  if (viewsCount >= 4) return "M";
};
