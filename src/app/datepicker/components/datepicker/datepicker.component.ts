import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core'
import { DateRange } from '../../models'
import { of } from 'rxjs'
import { map } from 'rxjs/operators'
import { getWeeksInMonth } from '../../helpers'

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

  constructor() { }
}
