import { BehaviorSubject } from 'rxjs'
import { addMonths, endOfDay, endOfToday, isAfter, isBefore, startOfDay, startOfToday, subMonths } from 'date-fns'

import { Month } from './month'
import { ControllerData, DatepickerOptions, DEFAULT_DATEPICKER_OPTIONS, isTimeRange, TimeRange } from './datepicker'
import { Day } from './day'

export class DatepickerController {
  private readonly options: Readonly<DatepickerOptions>
  private tempTimeRange: TimeRange = { start: null, end: null }

  public readonly months$ = new BehaviorSubject<Month[]>([])
  public readonly selectedRange$ = new BehaviorSubject<TimeRange>({
    start: startOfToday(),
    end: endOfToday()
  })

  public get controllerData(): ControllerData {
    return {
      selectedRange$: this.selectedRange$,
      options: this.options
    }
  }

  constructor(options: DatepickerOptions) {
    this.options = Object.assign(DEFAULT_DATEPICKER_OPTIONS, options)
    this.setUp()

    console.debug(this)
  }

  /**
   * @description
   * ### Сдвиг календаря вперед
   *
   * Сдвиг видимой части календаря вперед
   *
   * @param {number} [monthsCount = 1] - Положительное целое число, на велечину которого будут сдвинут каледарь
   */
  public next(monthsCount: number = 1) {
    if (monthsCount === 0 || monthsCount === null || typeof monthsCount === 'undefined') return
    const newMonths = this.months$.value.map(month => new Month(addMonths(month.date, monthsCount), this.controllerData))

    this.months$.next(newMonths)
  }

  /**
   * @description
   * ### Сдвиг календаря назад
   *
   * Сдвиг видимой части календаря назад
   *
   * @param {number} [monthsCount = 1] - Положительное целое число, на велечину которого будут сдвинут каледарь
   */
  public prev(monthsCount: number = 1) {
    if (monthsCount === 0 || monthsCount === null || typeof monthsCount === 'undefined') return
    const newMonths = this.months$.value.map(month => new Month(subMonths(month.date, monthsCount), this.controllerData))

    this.months$.next(newMonths)
  }

  public jumpTo(date: Date) {}

  /**
   * @description
   * ### Выбор определенной даты
   *
   * @param {Day | TimeRange} dayOrRange - Определенный день или интервал времени
   */
  public select(dayOrRange: Day | TimeRange) {

    if (!this.options.isRange) {

      if (isTimeRange(dayOrRange)) {
        console.warn(`[ ${this.constructor.name} ]: Please set isRange option to true for use time range functionality`)
        return
      }

      if (dayOrRange instanceof Day) {
        this.selectedRange$.next({ start: dayOrRange.date, end: dayOrRange.date })
      }

      return
    }

    if (!(dayOrRange instanceof Day)) {
      this.selectedRange$.next(dayOrRange)
      return
    }

    if (this.tempTimeRange.start === null && this.tempTimeRange.end === null) {
      this.tempTimeRange.start = startOfDay(dayOrRange.date)
      return
    }

    if (this.tempTimeRange.start !== null && isBefore(dayOrRange.date, this.tempTimeRange.start)) {
      this.tempTimeRange.start === startOfDay(dayOrRange.date)
      return
    }

    if (this.tempTimeRange.start !== null &&
        this.tempTimeRange.end === null &&
        isAfter(dayOrRange.date, this.tempTimeRange.start)) {

      this.tempTimeRange.end = endOfDay(dayOrRange.date)
      this.selectedRange$.next(this.tempTimeRange)

      this.tempTimeRange = { start: null, end: null }
    }
  }

  private setUp() {
    const today = startOfToday()

    if (this.options.displayMonth === 0 ||
      this.options.displayMonth === null ||
      typeof this.options.displayMonth === 'undefined'
    ) {
      this.months$.next([ new Month(today, this.controllerData) ])
      return
    }

    const months = []

    for (let i = 0; i < this.options.displayMonth; i++) {
      const month = new Month(addMonths(today, i), this.controllerData)
      months.push(month)
    }

    this.months$.next(months)
  }
}
