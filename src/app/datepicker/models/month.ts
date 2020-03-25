import { Week } from './week'
import { addWeeks, format, getISODay, getISOWeek, startOfMonth, subDays } from 'date-fns'

export enum MonthName {
  jan = 'JANUARY',
  feb = 'FEBRUARY',
  mar = 'MARCH',
  apr = 'APRIL',
  may = 'MAY',
  jun = 'JUNE',
  jul = 'JULY',
  aug = 'AUGUST',
  sep = 'SEPTEMBER',
  oct = 'OCTOBER',
  nov = 'NOVEMBER',
  dec = 'DECEMBER'
}

export class Month {
  public weeks: Week[] = []
  public name: MonthName

  constructor(date: Date) {
    this.name = format(date, 'MMMM').toUpperCase() as MonthName

    const startMonth = startOfMonth(date)
    const firstDayInMonthWeek = subDays(startMonth, getISODay(startMonth) - 1)

    for (let i = 0; i < 6; i++) {
      const numberOfWeek = getISOWeek(addWeeks(firstDayInMonthWeek, i))
      const week = new Week(numberOfWeek, date.getFullYear())
      this.weeks.push(week)
    }
  }
}
