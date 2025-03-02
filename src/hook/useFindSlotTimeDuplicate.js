const useFindSlotTimeDuplicate = (slots) => {
  const timeToMinutes = (time) => {
    const [hours, minutes, seconds] = String(time).split(":").map(Number);
    return hours * 60 + minutes;
  };

  const intervals =
    Array.isArray(slots) &&
    slots.map((slot) => ({
      startHour: timeToMinutes(slot.startHour),
      endHour: timeToMinutes(slot.endHour),
      id: slot.id,
      day: slot.day,
      status: slot.status,
      therapist: slot.therapist,
    }));

  for (let i = 0; i < intervals.length; i++) {
    for (let j = 0; j < intervals.length; j++) {
      if (i !== j) {
        if (
          intervals[i].startHour < intervals[j].endHour &&
          intervals[i].endHour > intervals[j].startHour
        ) {
          intervals[i].duplicateSlotTime = true;
          intervals[j].duplicateSlotTime = true;
        }
      }
    }
  }

  return intervals;
};

export default useFindSlotTimeDuplicate;
