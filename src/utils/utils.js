export const fixUrl = (url) => {
  return url.replace("&amp;", "&");
};

export const getDate = (date) => {
  if (!date) return null;
  date *= 1000;
  const currentDate = Date.now();
  const second = 1000;
  const minute = 60000;
  const hour = 3600000;
  const day = 86400000;

  const delta = currentDate - date;
  if (delta < second) return "now";
  if (delta > second && delta < minute)
    return `${Math.floor(delta / second)} second(s) ago`;
  if (delta > minute && delta < hour)
    return `${Math.floor(delta / minute)} minute(s) ago`;
  if (delta > hour && delta < day)
    return `${Math.floor(delta / hour)} hour(s) ago`;
  if (delta > day && delta < 3 * day)
    return `${Math.floor(delta / day)} day(s) ago`;

  const postedDate = new Date(date);

  return `${postedDate.getDate()}/${
    postedDate.getMonth() + 1
  }/${postedDate.getFullYear()} ${postedDate.getHours()}:${
    postedDate.getMinutes() < 10 ? 0 : ""
  }${postedDate.getMinutes()}`;
};
