import { Component } from '@angular/core';
import { DatepickerController } from './datepicker/models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  public controller = new DatepickerController({
    displayMonth: 2
  })
}
