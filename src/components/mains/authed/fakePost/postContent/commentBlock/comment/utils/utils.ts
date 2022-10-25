export function msToTime(millis: number) {
  const seconds = millis / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const years = days / 365;
  return {
    seconds: Math.floor(seconds),
    minutes: Math.floor(minutes),
    hours: Math.floor(hours),
    days: Math.floor(days),
    weeks: Math.floor(weeks),
    years: Math.floor(years)
  };
}

export const getDifferenceWithCode = (createDate: string) => {
  const dates = Object.entries(
    msToTime(Date.now() - Date.parse(createDate))
  ).filter(([, roundedTime]) => roundedTime !== 0);

  return dates.reduce(
    (prev, current) => (prev[1] < current[1] ? prev : current),
    dates[0]
  );
};
