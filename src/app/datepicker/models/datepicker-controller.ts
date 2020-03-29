import { BehaviorSubject } from 'rxjs'
import { addMonths, endOfToday, isAfter, startOfToday, subMonths, isBefore } from 'date-fns'

import { Month } from './month'
import { ControllerData, DatepickerOptions, DEFAULT_DATEPICKER_OPTIONS, TimeRange } from './datepicker'
import { Day } from './day'

export class DatepickerController implements ControllerData {
  private options: DatepickerOptions
  private tempTimeRange: TimeRange = { start: null, end: null }

  public readonly months$ = new BehaviorSubject<Month[]>([])
  public readonly selectedRange$ = new BehaviorSubject<TimeRange>({
    start: startOfToday(),
    end: endOfToday()
  })

  constructor(options: DatepickerOptions) {
    this.options = Object.assign(DEFAULT_DATEPICKER_OPTIONS, options)
    this.setUp()

    console.debug(this)
  }

  public next(count: number = 1) {
    if (count === 0 || count === null || typeof count === 'undefined') return
    const newMonths = this.months$.value.map(month => new Month(addMonths(month.date, count), this))
    this.months$.next(newMonths)
  }

  public prev(count: number = 1) {
    if (count === 0 || count === null || typeof count === 'undefined') return
    const newMonths = this.months$.value.map(month => new Month(subMonths(month.date, count), this))
    this.months$.next(newMonths)
  }

  public jumpTo(date: Date) {}

  public select(day: Day) {
    if (!this.options.isRange) {
      this.selectedRange$.next({ start: day.date, end: day.date })
      return
    }

    if (this.tempTimeRange.start === null && this.tempTimeRange.end === null) {
      this.tempTimeRange.start = day.date
      return
    }

    if (this.tempTimeRange.start !== null && isBefore(day.date, this.tempTimeRange.start)) {
      this.tempTimeRange.start === day.date
      return
    }

    if (this.tempTimeRange.start !== null &&
        this.tempTimeRange.end === null &&
        isAfter(day.date, this.tempTimeRange.start)) {
      this.tempTimeRange.end = day.date
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
      this.months$.next([ new Month(today, this) ])
      return
    }

    const months = []

    for (let i = 0; i < this.options.displayMonth; i++) {
      const month = new Month(addMonths(today, i), this)
      months.push(month)
    }

    this.months$.next(months)
  }
}
