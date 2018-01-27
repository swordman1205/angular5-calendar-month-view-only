import { Component, Input, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { EventOptionEntity, ContextMenuItemEntity } from './entities';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'sc-calendar',
  templateUrl: './sc-calendar.component.html',
  styleUrls: ['./sc-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SCCalendarComponent implements OnInit, DoCheck {
  @Input() options: EventOptionEntity;
  @Input() contextMenu: ContextMenuItemEntity[] = [];
  eventOptions: EventOptionEntity = new EventOptionEntity();

  oldOptions: EventOptionEntity;

  constructor() {}

  ngOnInit() {
    this.oldOptions = _.cloneDeep(this.options);

    this.eventOptions = {
      ...this.eventOptions,
      ...this.options
    };
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

  get title() {
    return moment(this.eventOptions.defaultDate).format(this.eventOptions.titleFormat);
  }

  dateChanged(when) {
    switch (when) {
      case 'prev':
        this.options.defaultDate = moment(this.eventOptions.defaultDate).subtract(1, <any>this.eventOptions.defaultView).format('YYYY-MM-DD');
        break;
      case 'next':
        this.options.defaultDate = moment(this.eventOptions.defaultDate).add(1, <any>this.eventOptions.defaultView).format('YYYY-MM-DD');
        break;
      case 'today':
        this.options.defaultDate = moment().format('YYYY-MM-DD');
        break;
    }
  }
}
