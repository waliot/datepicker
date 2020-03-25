import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { DateRange } from '../../models'
import { Month } from '../../models/month'

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: [ './datepicker.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent {

  public month = new Month(new Date())

  @Input()
  public value: DateRange = {
    from: new Date(),
    to: new Date()
  }

  @Input()
  public monthDisplay: number

  @Input()
  public dayTemplateRef: TemplateRef<any>

  @Output()
  public dateSelect = new EventEmitter()

  constructor() {
    console.log(this.month)
  }
}
