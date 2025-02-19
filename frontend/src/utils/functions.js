export const formatDate = (isoDate, options = {}) => {
  const date = new Date(isoDate);

  const defaultOptions = {
    minute: "2-digit",
    hour: "2-digit",
    day: "2-digit",
    month: "short",
    hour24: true,
  };
  // Merge default options with user-provided options
  const finalOptions = { ...defaultOptions, ...options };

  return date.toLocaleString("en-US", finalOptions);
};

export const formatVideoViewsCount = (viewsCount) => {
  if (viewsCount < 1_000) {
    return viewsCount.toString();
  } else if (viewsCount < 1_000_000) {
    return (viewsCount / 1000).toFixed(1) + "K";
  } else if (viewsCount < 1_000_000_000) {
    return (viewsCount / 1_000_000).toFixed(1) + "M";
  } else {
    return (viewsCount / 1_000_000_000).toFixed(1) + "B";
  }
};

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

export const getBackendErrorMessage = (error) => error.response?.data?.message;

export const getEmoji = () => {
  const emojies = [
    "😀",
    "😂",
    "😍",
    "😎",
    "😢",
    "😡",
    "🥳",
    "😱",
    "😴",
    "😇",
    "🤔",
    "😜",
    "😋",
    "😏",
    "😬",
    "😳",
    "😵",
    "🤯",
    "🥺",
    "😺",
    "🐶",
    "🐱",
    "🐻",
    "🐼",
    "🐨",
    "🦁",
    "🐯",
    "🦊",
    "🐸",
    "🐵",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
    "🐘",
    "🦒",
    "🐬",
    "🐳",
    "🐋",
    "🦈",
    "🐊",
    "🦙",
    "🐴",
    "🦄",
    "🌈",
    "🌻",
    "🌼",
    "🎛️",
    "🌺",
    "🍎",
    "🍕",
    "🍔",
    "🍣",
    "🍦",
    "🎉",
    "🎈",
    "🎊",
    "🤖",
    "🎵",
  ];
  return emojies[Math.floor(Math.random() * emojies.length)];
};
