import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Day, Month } from '../../models'

@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datepicker-month'
  }
})
export class DatepickerMonthComponent {

  @Input()
  public month: Month

  @Output('select')
  public select$ = new EventEmitter<Day>()

  constructor() { }

  public selectDay(day: Day) {
    this.select$.emit(day)
  }
}
