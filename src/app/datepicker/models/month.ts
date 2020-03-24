import { Week } from './week'
import { getWeeksInMonth } from '../helpers'

export class Month {
  public weeks: Week[]

  constructor(date: Date) {
    const weekCount = getWeeksInMonth(date)

    for (let i = 0; i < weekCount; i++) {
      const week = new Week()
    }
  }
}
