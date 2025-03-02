function minutesToTime(minutes) {
  if (typeof minutes !== "number" || minutes < 0) {
    return null;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(remainingMinutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}
const timeToMinutes = (time) => {
  const [hours, minutes, seconds] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
};
const TIME_CACULATE = {
  minutesToTime,
  timeToMinutes,
};
export default TIME_CACULATE