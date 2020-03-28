import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Month } from '../../models/month'
import { Day } from '../../models/day'

@Component({
  selector: 'app-datepicker-month',
  templateUrl: './datepicker-month.component.html',
  styleUrls: ['./datepicker-month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datepicker-month'
  }
})
export class DatepickerMonthComponent implements OnInit {

  @Input()
  public month: Month

  @Output('select')
  public select$ = new EventEmitter<Day>()

  constructor() { }

  ngOnInit(): void {
    console.debug(this.month)
  }

  public selectDay(day: Day) {
    this.select$.emit(day)
  }
}
