import { format } from 'date-fns'

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
  public context
  public weekDay: WeekDayName

  constructor(public date: Date) {
    this.weekDay = format(date, 'iiii').toUpperCase() as WeekDayName
  }
}
