import { ControllerData } from './datepicker'
import { map } from 'rxjs/operators'
import { getISODay, isEqual, isToday, isWithinInterval } from 'date-fns'
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

  private get isFirstDayOfMonth() {
    return this.date.getDate() === 1
  }

  public cssClasses$ = this.controllerData.selectedRange$.pipe(
    map((range) => {
      return {
        'is-today': isToday(this.date),
        'is-selected': range.start.getDate() === range.end.getDate() && isEqual(range.start, this.date),
        'is-in-range': isWithinInterval(this.date, range),
        'is-range-edge': isEqual(this.date, range.start) || isEqual(this.date, range.end),
        'is-range-edge-start': isEqual(this.date, range.start),
        'is-range-edge-end': isEqual(this.date, range.end),
        'is-first-day-of-month': this.isFirstDayOfMonth
        // 'is-in-prev-month':
      }
    })
  )

  public customProperties$ = of({
    '--first-day-shift': getISODay(this.date)
  }).pipe(
    map((properties) => {
      // todo: Приводит к `style='null'` если условие срабатывает, а атрибуты вообще быть не должно
      if (!this.isFirstDayOfMonth) return null

      return Object.entries(properties).reduce((acc, [ key, value ]) => {
        const newProperty = `${ key }: ${ value }`
        if (acc.length === 0) return newProperty
        return `${ acc }; ${ newProperty }`
      }, '')
    })
  )

  constructor(public date: Date,
              private controllerData: ControllerData) {
  }

  /**
   * @description
   * ### Выбрать этот день
   * Метод позволяющий выбрать этот день в календаре
   *
   * @todo: Требует реализации
   * Нужно сделать самокотролируемый класс
   *
   * @deprecated
   */
  public select() {

  }

  /**
   * @todo: Реализовать наведение, так как сейчас не понятно какой интервал будет выбран
   */
  public mouseEnterHandler() {

  }
}
