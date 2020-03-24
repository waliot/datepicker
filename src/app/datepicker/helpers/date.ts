export function getWeeksInMonth(date: Date) {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const weeksInMonth = daysInMonth / 7

  return Math.ceil(weeksInMonth)
}

export function getDaysInWeek() {

}
