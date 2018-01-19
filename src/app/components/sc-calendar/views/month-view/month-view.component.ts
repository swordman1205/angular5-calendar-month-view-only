import { Component, OnInit, ViewChild, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { EventOptionEntity } from '../../entities';
import * as moment from 'moment';

@Component({
  selector: 'sc-calendar-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class SCCalendarMonthViewComponent implements OnInit, OnChanges {
  @Input() options: EventOptionEntity;
  @ViewChild('monthView') monthView: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCellHeight();
  }

  monthDays:any;
  cellHeight: number = 0;

  constructor() {}

  ngOnInit() {
    this.init();
    this.updateCellHeight();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !changes.options.firstChange) {
      this.init();
    }
  }

  private init() {
    this.monthDays = this.getMonthDays(this.options.defaultDate);    
  }

  private updateCellHeight() {
    this.cellHeight = this.monthView.nativeElement.clientWidth / 7;
  }

  private getMonthDays(currentDate) {
    const monthDays = [], res = [];
    for (let i = 0; i < moment(currentDate).startOf('month').day(); i++) {
      const tempDay:any = {
        active: false,
        date: moment(currentDate).startOf('month').subtract(i + 1, 'd')
      };
      tempDay.isToday = moment().isSame(tempDay.date, 'day');
      monthDays.splice(0, 0, tempDay);
    }
    for (let i = 1; i <= moment(currentDate).daysInMonth(); i++) {
      const tempDay:any = {
        active: true,
        date: moment(currentDate).date(i)
      };
      tempDay.isToday = moment().isSame(tempDay.date, 'day');
      monthDays.push(tempDay);
    }
    const day = moment(currentDate).endOf('month').day();
    if (day !== 6) {
      for (let i = day + 1; i < 7; i++) {
        const tempDay:any = {
          active: false,
          date: moment(currentDate).endOf('month').add(i - day, 'd')
        };
        tempDay.isToday = moment().isSame(tempDay.date, 'day');
        monthDays.push(tempDay);
      }
    }
    for (let i = 0; i < monthDays.length / 7; i++) {
      res.push([]);
    }
    for (let i = 0; i < monthDays.length; i++) {
      res[Math.floor(i / 7)].push(monthDays[i]);
    }
    return res;
  }

  isToday(date) {
    return moment().isSame(date, 'day');
  }

  dayRender(event) {    
    this.options.dayRender(event.date, event.cell);
  }
}
