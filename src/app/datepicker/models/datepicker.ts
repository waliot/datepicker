export interface DateRange {
  start: Date
  end: Date
}

export interface DatepickerOptions {
  displayMonth: number
  initialValue?: DateRange
}

export const DEFAULT_DATEPICKER_OPTIONS: Partial<DatepickerOptions> = {
  initialValue: {
    start: new Date(),
    end: new Date()
  }
}
