import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core'
import { DateRange } from '../../models'
import { of } from 'rxjs'
import { Month } from '../../models/month'

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: [ './datepicker.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent {

  public now$ = of(new Date())

  @Input()
  public value: DateRange = {
    from: new Date(),
    to: new Date()
  }

  @Input()
  public dayTemplateRef: TemplateRef<any>

  constructor() {
    const month = new Month(new Date())
    console.log(month)
  }
}
