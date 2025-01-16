export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
};

export const formatVideoViewsCount = (viewsCount) => {
  if (viewsCount <= 4) return "K";
  if (viewsCount >= 4) return "M";
};

export const getBackendErrorMessage = (error) => error.response?.data?.message;
