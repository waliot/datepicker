import { Observable } from 'rxjs'

export interface TimeRange {
  start: Date
  end: Date
}

export interface DatepickerOptions {
  displayMonth: number
  isRange?: boolean
}

export const DEFAULT_DATEPICKER_OPTIONS: Partial<DatepickerOptions> = {
  isRange: false
}

export interface ControllerData {
  selectedRange$: Observable<TimeRange>
}
