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

export const downloadFile = (data, filename) => {
  const blob = new Blob([data]);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", filename);

  // Append to the body and trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
