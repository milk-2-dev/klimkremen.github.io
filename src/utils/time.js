export const getTime = (date, timeZone) => {
  return date.toLocaleString('en-US', {
    timeZone: timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}
