import { Component, OnInit, ViewChild, ViewChildren, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { EventOptionEntity, EventEntity, ContextMenuItemEntity } from '../../entities';
import * as moment from 'moment';
import * as _ from 'lodash';
import { MatMenu } from '@angular/material';

@Component({
  selector: 'sc-calendar-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class SCCalendarMonthViewComponent implements OnInit, OnChanges {
  @Input() options: EventOptionEntity;
  @Input() contextMenu: { mode?: number, data?: ContextMenuItemEntity[] } = {};
  @Input() hoverAsyncFn: (shiftId: number, group?: boolean) => Promise<any>;

  @Output() updateMonthRange: EventEmitter<any> = new EventEmitter();

  @ViewChild('monthView') monthView: any;
  @ViewChildren('daycell') dayCellList: QueryList<ElementRef>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateCellHeight();
  }

  menu: MatMenu;

  activatedCell: ElementRef;
  contextMenuContent: ContextMenuItemEntity[];

  monthDays:any;
  cellHeight: number = 0;
  positions:any;
  rowData:any;

  hoverPopupData: any;

  menuEvent: any;

  viewStartDate: any;
  viewEndDate: any;

  constructor(
    private renderer: Renderer2) {}

  ngOnInit() {
    this.updateCellHeight();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !changes.options.firstChange) {
      this.init();
    }
    if (changes.contextMenu) {
      this.contextMenuContent = changes.contextMenu.currentValue.data;
    }
  }

  private init(): void {
    this.initPositions();
    this.rowData = [];
    this.monthDays = this.getMonthDays(this.options.defaultDate);
    this.updateMonthRange.next({ startDate: this.viewStartDate, endDate: this.viewEndDate });
    if (this.monthDays) {
      for (let i = 0; i < this.monthDays.length; i++) {
        const row = this.getRenderedEvents(this.monthDays[i][0].date, this.monthDays[i][6].date);
        this.rowData.push({
          content: row,
          height: this.positions[0].length
        });
        this.initPositions();
      }
    }
  }

  private initPositions(): void {
    this.positions = [];
    for (let i = 0; i < 7; i++) {
      this.positions.push([]);
    }
  }

  private updateCellHeight(): void {
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
    this.viewStartDate = monthDays[0].date.format('YYYY-MM-DD');
    this.viewEndDate = monthDays[monthDays.length - 1].date.format('YYYY-MM-DD');
    return res;
  }

  private getRenderedEvents(startDate, endDate) {
    const tempEvents = [];
    if (!this.options.events) return tempEvents;
    for (let i = 0; i < this.options.events.length; i++) {
      const startAt = moment(this.options.events[i].start),
            endAt = (this.options.events[i].end && moment(this.options.events[i].end).isValid())? moment(this.options.events[i].end) : moment(this.options.events[i].start).endOf('day');
      if ((startAt.isSameOrAfter(startDate, 'day') && startAt.isSameOrBefore(endDate, 'day')) || (startAt.isBefore(startDate) && endAt.isSameOrAfter(startDate))) {
        const event: any = _.cloneDeep(this.options.events[i]);
        event.startedAt = startAt;
        event.endedAt = endAt;
        event.days = moment(event.endedAt.format('YYYY-MM-DD')).diff(event.startedAt.format('YYYY-MM-DD'), 'days') + 1;
        const isBeyondStart = event.startedAt.isBefore(startDate, 'day');
        const isBeyondEnd = event.endedAt.isAfter(endDate, 'day');
        if (isBeyondStart || isBeyondEnd) {
          const start = isBeyondStart? startDate : event.startedAt;
          const end = isBeyondEnd? endDate : event.endedAt;
          event.duration = moment(end.format('YYYY-MM-DD')).diff(start.format('YYYY-MM-DD'), 'days') + 1;
          event.left = start.diff(startDate, 'days');
          event.isMore = isBeyondEnd;
        } else {
          event.duration = event.days;
          event.left = event.startedAt.diff(startDate, 'days');
          event.isMore = false;
        }
        tempEvents.push({
          raw: this.options.events[i],
          data: event
        });
      }
    }
    tempEvents.sort((a, b) => {
      if (a.data.startedAt.isBefore(b.data.startedAt)) return -1;
      if (a.data.startedAt.isAfter(b.data.startedAt)) return 1;
      if (a.data.days > b.data.days) return -1;
      if (a.data.days < b.data.days) return 1;
      return 0;
    });
    for (let i = 0; i < tempEvents.length; i++) {
      const empties = [];
      for (let j = 0; j < this.positions[tempEvents[i].data.left].length; j++) {
        if (this.positions[tempEvents[i].data.left][j] === -1)
          empties.push(j);
      }
      if (empties.length === 0) {
        for (let j = 0; j < this.positions.length; j++) {
          if (j >= tempEvents[i].data.left && j < tempEvents[i].data.left + tempEvents[i].data.duration)
            this.positions[j].push(i);
          else
            this.positions[j].push(-1);
        }
        tempEvents[i].data.top = this.positions[0].length - 1;
      } else {
        for (let j = 0; j < empties.length; j++) {
          let flag = 0;
          for (let k = tempEvents[i].data.left + 1; k < tempEvents[i].data.left + tempEvents[i].data.duration; k++) {
            if (this.positions[k][empties[j]] !== -1) {
              flag = -1;
              break;
            }
          }
          if (flag !== -1) {
            for (let k = tempEvents[i].data.left; k < tempEvents[i].data.left + tempEvents[i].data.duration; k++) {
              this.positions[k][empties[j]] = i;
            }
            tempEvents[i].data.top = empties[j];
            break;
          } else {
            if (j === empties.length - 1) {
              for (let k = 0; k < this.positions.length; k++) {
                if (k >= tempEvents[i].data.left && k < tempEvents[i].data.left + tempEvents[i].data.duration)
                  this.positions[k].push(i);
                else
                  this.positions[k].push(-1);
              }
              tempEvents[i].data.top = this.positions[0].length - 1;
              break;
            } else {
              continue;
            }
          }
        }
      }
    }
    return tempEvents;
  }

  isToday(date): boolean {
    return moment().isSame(date, 'day');
  }

  dayRender(day): void {    
    this.options.dayRender(day.date, day.cell);
  }

  eventRender(data): void {
    this.options.eventRender(data.event, data.element);
  }

  async onPopupShown(event): Promise<any> {
    if (!this.hoverPopupData) {
      this.hoverPopupData = [
        {
          start: event.data.startedAt.format('h:mm a'),
          end: event.data.endedAt.format('h:mm a')
        }
      ];
    }
    switch (event.raw.type) {
      case 'u':
        this.hoverPopupData = null;
        break;
      case 'g':
        this.hoverPopupData = await this.hoverAsyncFn(event.raw.id, true);
        break;
      default:
        this.hoverPopupData = [await this.hoverAsyncFn(event.raw.id)];
        break;
    }
  }

  onMenuShown(event): void {
    this.menuEvent = event;
  }

  checkActivation(event: any, Yindex: number): void {
    const cellWidth = Math.floor(event.target.clientWidth / 7);
    const xIndex = (event.offsetX % cellWidth > 0) ? Math.floor(event.offsetX / cellWidth) : Math.floor(event.offsetX / cellWidth) - 1;
    const cell = this.dayCellList.toArray()[Yindex * 7 + xIndex];
    if (cell !== this.activatedCell) {
      if (this.activatedCell) {
        this.renderer.removeClass(this.activatedCell.nativeElement, 'activated');
      }
      this.renderer.addClass(cell.nativeElement, 'activated');
      this.activatedCell = cell;
    }
  }

  clearActivation(event: any): void {
    event.stopPropagation();
    if (this.activatedCell) {
      this.renderer.removeClass(this.activatedCell.nativeElement, 'activated');
      this.activatedCell = null;
    }
  }

  cellClick() {
    if (this.activatedCell) {
      this.activatedCell.nativeElement.click();
    }
  }
}
