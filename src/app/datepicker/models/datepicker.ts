import { Observable } from 'rxjs'

export interface TimeRange {
  start: Date
  end: Date
}

/**
 * @description
 * ### Опции контроллера календаря
 */
export interface DatepickerOptions {
  /**
   * @description
   * ### Число месяцев
   *
   * Число месяцев которые будут отображаться в календаре
   *
   * @default 2
   */
  displayMonth: number

  /**
   * @description
   * ### Интервальный datepicker
   *
   * Флаг указывающий что в этом календаре можно выбирать
   * интервал времени
   *
   * @default false
   */
  isRange?: boolean

  /**
   * @description
   * ### Рендереринг дней соседних месяцев
   *
   * Флаг регулирующий рендеринг дней относящихся к
   * предыдущему или следующему месяцу
   *
   * @default false
   */
  monthSupplement?: boolean
}

export const DEFAULT_DATEPICKER_OPTIONS: Partial<DatepickerOptions> = {
  isRange: false,
  monthSupplement: false
}

export interface ControllerData {
  /**
   * @description
   * ### Поток с выбранной датой
   *
   * Если флаг `isRange` в значении `true` то значения
   * объекта TimeRange, а именно `start` и `end` равны
   */
  selectedRange$: Observable<TimeRange>

  /**
   * @see {DatepickerOptions}
   */
  options: DatepickerOptions
}

export function isTimeRange(obj: any) {
  return obj.start !== null && typeof obj.start !== 'undefined' && obj.end !== null && typeof obj.end !== 'undefined'
}
