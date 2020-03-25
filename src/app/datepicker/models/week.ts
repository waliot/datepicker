import { Day } from './day'
import { parseISO, addDays } from 'date-fns'

export class Week {
  public days: Day[] = []

  constructor(public number: number, year: number) {
    // https://en.wikipedia.org/wiki/ISO_week_date
    const firstDay = parseISO(`${year}-W${number.toString().padStart(2, '0')}-1`)

    for (let i = 0; i < 7; i++) {
      const day = new Day(addDays(firstDay, i))
      this.days.push(day)
    }
  }
}
