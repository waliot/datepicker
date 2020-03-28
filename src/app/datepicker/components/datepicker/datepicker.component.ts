import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { DatepickerController, DateRange } from '../../models'
import { BehaviorSubject } from 'rxjs'
import { Month } from '../../models/month'
import { addMonths } from 'date-fns'
import { Day } from '../../models/day'

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: [ './datepicker.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent {

  @Input()
  public controller: DatepickerController

  @Input()
  public dayTemplateRef: TemplateRef<any>

  @Output()
  public dateSelect = new EventEmitter()

  constructor() {
  }

  public daySelectHandler(day: Day) {
    this.dateSelect.emit(day)
  }

  public nextMoth() {
    this.controller.next()
  }

  public prevMonth() {
    this.controller.prev()
  }
}
