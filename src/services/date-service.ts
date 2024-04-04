import dayjs from "dayjs";

export const isToday = (date: string) => {
  console.log("Checking if is today:", date);

  const today =
    dayjs(date).isAfter(dayjs().subtract(1, "day").endOf("day")) &&
    dayjs(date).isBefore(dayjs().endOf("day"));
  console.log(today);

  return today;
};

export const isYesterday = (date: string) => {
  console.log("Checking if is yesterday:", date);
  const yesterday =
    dayjs(date).isAfter(dayjs().subtract(2, "day").endOf("day")) &&
    dayjs(date).isBefore(dayjs().subtract(1, "day").endOf("day"));
  console.log(yesterday);
  return yesterday;
};

export const isEarlier = (date: string) => {
  console.log("Checking if is earlier:", date);
  const earlier = dayjs(date).isBefore(
    dayjs().subtract(1, "day").startOf("day")
  );
  console.log(earlier);
  return earlier;
};
