import dayjs from "dayjs";

export const secondToDate = (second) => {
  return dayjs().set('hour', 0).set('minute', 0).set('second', second)
}

export const h2s = (h) => h * 60**2
export const m2s = (h) => h * 60

export const timeToSecond = (time) => {
  const durationDate = dayjs(time)

  const hourInSeconds = h2s(durationDate.hour())
  const minuteInSeconds = m2s(durationDate.minute())
  const seconds = durationDate.second()

  return hourInSeconds + minuteInSeconds + seconds
}
