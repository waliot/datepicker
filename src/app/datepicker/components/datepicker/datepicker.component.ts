import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { DatepickerController, Day, TimeRange } from '../../models'
import { defer } from 'rxjs'
import { tap } from 'rxjs/operators'

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

  constructor() {
  }

  public daySelectHandler(day: Day) {
    this.controller.select(day)
  }

  public nextMoth() {
    this.controller.next()
  }

  public prevMonth() {
    this.controller.prev()
  }
}
