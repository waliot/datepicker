import { BehaviorSubject } from 'rxjs'
import { Month } from './month'
import { DatepickerOptions, DEFAULT_DATEPICKER_OPTIONS } from './datepicker'
import { addMonths, subMonths } from "date-fns"

export class DatepickerController {
  private options: DatepickerOptions
  public readonly months$ = new BehaviorSubject<Month[]>([])

  constructor(options: DatepickerOptions) {
    this.options = Object.assign(DEFAULT_DATEPICKER_OPTIONS, options)

    if (this.options.displayMonth === 0 ||
      this.options.displayMonth === null ||
      typeof this.options.displayMonth === 'undefined'
    ) {
      this.months$.next([ new Month(this.options.initialValue.start) ])
      return
    }

    const months = []

    for (let i = 0; i < this.options.displayMonth; i++) {
      const month = new Month(addMonths(this.options.initialValue.start, i))
      months.push(month)
    }

    this.months$.next(months)
  }

  public next(count: number = 1) {
    if (count === 0 || count === null || typeof count === 'undefined') return
    const newMonths = this.months$.value.map(month => new Month(addMonths(month.date, count)))
    this.months$.next(newMonths)
  }

  public prev(count: number = 1) {
    if (count === 0 || count === null || typeof count === 'undefined') return
    const newMonths = this.months$.value.map(month => new Month(subMonths(month.date, count)))
    this.months$.next(newMonths)
  }
}
