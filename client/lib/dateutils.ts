export function timeAgo(date: Date): string {
  if (date === null) return date;

  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  if (seconds >= 31536000) {
    const interval = Math.floor(seconds / 31536000);
    return interval + (interval > 1 ? " years ago" : " year ago");
  }
  if (seconds >= 2628000) {
    const months = Math.floor(seconds / 2628000);
    return months + (months > 1 ? " months ago" : " month ago");
  }
  if (seconds >= 86400) {
    const days = Math.floor(seconds / 86400);
    return days + (days > 1 ? " days ago" : " day ago");
  }
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    return hours + (hours > 1 ? " hours ago" : " hour ago");
  }
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    return minutes + (minutes > 1 ? " minutes ago" : " minute ago");
  }
  return "just now";
}
