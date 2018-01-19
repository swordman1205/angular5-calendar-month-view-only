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

const MaterialModules = [
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
    SCCalendarComponent
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
