import { toZonedTime } from "date-fns-tz";
import { differenceInDays } from "date-fns/differenceInDays";
import { differenceInHours } from "date-fns/differenceInHours";
import { differenceInMinutes } from "date-fns/differenceInMinutes";
import { differenceInSeconds } from "date-fns/differenceInSeconds";

export const toLocalTime = (date: Date | string) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (typeof date === "string") {
    return toZonedTime(date, timeZone);
  } else {
    const dateString = date.toISOString();
    return toZonedTime(dateString, timeZone);
  }
};

export const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffDays = differenceInDays(now, date);
  const diffHours = differenceInHours(now, date);
  const diffMinutes = differenceInMinutes(now, date);
  const diffSeconds = differenceInSeconds(now, date);

  if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months ago`;
  } else {
    return `${Math.floor(diffDays / 365)} years ago`;
  }
};
