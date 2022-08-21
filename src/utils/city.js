export const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
export const getRegionDate = (timeZone) => {
  if (timeZone) {
    let options = {
        timeZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      },
      formatter = new Intl.DateTimeFormat([], options)
    return formatter.format(new Date())
  }
}
