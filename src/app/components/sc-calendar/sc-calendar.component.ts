import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation, DoCheck, Renderer2, OnDestroy } from '@angular/core';
import { EventOptionEntity, ContextMenuItemEntity } from './entities';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'sc-calendar',
  templateUrl: './sc-calendar.component.html',
  styleUrls: ['./sc-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SCCalendarComponent implements OnInit, OnDestroy, DoCheck {
  @Input() options: EventOptionEntity;
  @Input() contextMenu: { mode?: number, data?: ContextMenuItemEntity[] } = {};
  @Input() ajax: Boolean = false;

  @Input('loading') set updateLoading(value: boolean) {
    this.toggleLoader(value);
  }

  @Input() hoverAsyncFn: (shiftId: number, group?: boolean) => Promise<any>;

  @Output() optionChanged: EventEmitter<{startDate: string, endDate: string}> = new EventEmitter();
  eventOptions: EventOptionEntity = new EventOptionEntity();

  oldOptions: EventOptionEntity;
  dateRange: any;

  loading: boolean = false;

  constructor(
    private renderer: Renderer2) {}

  ngOnInit() {
    this.oldOptions = _.cloneDeep(this.options);

    this.eventOptions = {
      ...this.eventOptions,
      ...this.options
    };

    if (this.ajax) {
      setTimeout(() => this.loadAjaxEvents());
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'loading');
  }

  ngDoCheck() {
    if (JSON.stringify(this.options) !== JSON.stringify(this.oldOptions)) {
      this.oldOptions = _.cloneDeep(this.options);
      this.eventOptions = {
        ...this.eventOptions,
        ...this.options
      };
    }
  }

  get title(): string {
    return moment(this.eventOptions.defaultDate).format(this.eventOptions.titleFormat);
  }

  get month(): string {
    return moment(this.eventOptions.defaultDate).format('MMM');
  }

  dateChanged(when): void {
    switch (when) {
      case 'prev':
        this.options.defaultDate = moment(this.eventOptions.defaultDate).subtract(1, <any>this.eventOptions.defaultView).format('YYYY-MM-DD');
        break;
      case 'next':
        this.options.defaultDate = moment(this.eventOptions.defaultDate).add(1, <any>this.eventOptions.defaultView).format('YYYY-MM-DD');
        break;
    }
    if (this.ajax) {
      setTimeout(() => this.loadAjaxEvents());
    }
  }

  updateMonthRange(dateRange: any) {
    this.dateRange = dateRange;
  }

  loadAjaxEvents() {
    this.optionChanged.next(this.dateRange);
  }

  toggleLoader(show: boolean) {
    if (show) {
      this.renderer.addClass(document.body, 'loading');
      this.loading = true;
    } else {
      this.renderer.removeClass(document.body, 'loading');
      this.loading = false;
    }
  }
}
