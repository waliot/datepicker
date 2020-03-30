import { ControllerData } from './datepicker'
import { map } from 'rxjs/operators'
import { isEqual, isToday, isWithinInterval } from 'date-fns'
import { of } from 'rxjs'

export enum WeekDayName {
  mon = 'MONDAY',
  tue = 'TUESDAY',
  wed = 'WEDNESDAY',
  thu = 'THURSDAY',
  fri = 'FRIDAY',
  sat = 'SATURDAY',
  sun = 'SUNDAY'
}

export class Day {

  public cssClasses$ = this.controllerData.selectedRange$.pipe(
    map((range) => {
      return {
        'is-today': isToday(this.date),
        'is-selected': range.start.getDate() === range.end.getDate() && isEqual(range.start, this.date),
        'is-in-range': isWithinInterval(this.date, range),
        'is-range-edge': isEqual(this.date, range.start) || isEqual(this.date, range.end),
        'is-range-edge-start': isEqual(this.date, range.start),
        'is-range-edge-end': isEqual(this.date, range.end),
        // 'is-in-prev-month':
      }
    })
  )

  public customProperties$ = of({
    '--custom': '#333'
  }).pipe(
    map((properties) =>
      Object.entries(properties).reduce((acc, [ key, value ]) =>
        acc.length === 0 ? `${key}: ${value}` : `${acc};${key}: ${value}`, ''))
  )

  constructor(public date: Date,
              private controllerData: ControllerData) {
    // this.weekDay = format(date, 'iiii').toUpperCase() as WeekDayName
  }
}
