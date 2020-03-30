import { addDays, addWeeks, format, getISODay, getISOWeek, getMonth, parseISO, startOfMonth, subDays } from 'date-fns'
import { ControllerData } from './datepicker'
import { Day } from './day'

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
  public days: Day[] = []
  public name: MonthName

  public get nameForView() {
    return `${ monthTranslate[ this.name ] }, ${ format(this.date, 'y') }`
  }

  constructor(public date: Date,
              private controllerData: ControllerData) {
    this.name = format(this.date, 'MMMM').toUpperCase() as MonthName

    const startMonth = startOfMonth(this.date)
    const firstDayInMonthWeek = subDays(startMonth, getISODay(startMonth) - 1)

    for (let i = 0; i < 6; i++) {
      const numberOfWeek = getISOWeek(addWeeks(firstDayInMonthWeek, i))

      // https://en.wikipedia.org/wiki/ISO_week_date
      const firstDay = parseISO(`${this.date.getFullYear()}-W${numberOfWeek.toString().padStart(2, '0')}-1`)

      for (let i = 0; i < 7; i++) {
        const day = new Day(addDays(firstDay, i), this.controllerData)

        if (getMonth(day.date) !== getMonth(this.date)) {
          continue
        }

        this.days.push(day)
      }
    }
  }

}
