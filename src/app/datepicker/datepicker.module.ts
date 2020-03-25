import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerMonthComponent } from './components/datepicker-month/datepicker-month.component';



@NgModule({
  declarations: [ DatepickerComponent, DatepickerMonthComponent ],
  exports: [
    DatepickerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DatepickerModule { }
