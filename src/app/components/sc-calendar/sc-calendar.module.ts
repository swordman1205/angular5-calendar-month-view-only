import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SCCalendarComponent } from './sc-calendar.component';
import { SCCalendarMonthViewComponent, DayCellDirective } from './views';
import { SCCalendarHeaderComponent } from './header';

const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
    SCCalendarComponent,
    SCCalendarMonthViewComponent,
    SCCalendarHeaderComponent,
    DayCellDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    ...MaterialModules,
    FlexLayoutModule,
  ],
  providers: [],
  exports: [
    SCCalendarComponent
  ]
})
export class SCCalendarModule { }
