import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule,
  MatCardModule,
  MatMenuModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SCCalendarComponent } from './sc-calendar.component';
import { SCCalendarMonthViewComponent, SCCalendarEventChipComponent, DayCellDirective, ContextMenuTriggerDirective } from './views';
import { SCCalendarHeaderComponent } from './header';

const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule,
  MatCardModule,
  MatMenuModule,
  MatListModule
];

@NgModule({
  declarations: [
    SCCalendarComponent,
    SCCalendarMonthViewComponent,
    SCCalendarHeaderComponent,
    SCCalendarEventChipComponent,
    DayCellDirective,
    ContextMenuTriggerDirective
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
