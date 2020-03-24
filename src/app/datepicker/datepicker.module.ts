import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './components/datepicker/datepicker.component';



@NgModule({
  declarations: [ DatepickerComponent ],
  exports: [
    DatepickerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DatepickerModule { }
