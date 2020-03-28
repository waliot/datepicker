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

const monthTranslate = {
  [ MonthName.jan ]: 'Январь',
  [ MonthName.feb ]: 'Февраль',
  [ MonthName.mar ]: 'Март',
  [ MonthName.apr ]: 'Апрель',
  [ MonthName.may ]: 'Май',
  [ MonthName.jun ]: 'Июнь',
  [ MonthName.jul ]: 'Июль',
  [ MonthName.aug ]: 'Август',
  [ MonthName.sep ]: 'Сентябрь',
  [ MonthName.oct ]: 'Октябрь',
  [ MonthName.nov ]: 'Ноябрь',
  [ MonthName.dec ]: 'Декабрь'
}

export class Month {
  public weeks: Week[] = []
  public name: MonthName

  public get nameForView() {
    return `${ monthTranslate[ this.name ] }, ${ format(this.date, 'y') }`
  }

  constructor(public date: Date) {
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
