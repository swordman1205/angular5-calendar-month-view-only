import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventOptionEntity } from './entities';
import * as moment from 'moment';

@Component({
  selector: 'sc-calendar',
  templateUrl: './sc-calendar.component.html',
  styleUrls: ['./sc-calendar.component.scss']
})
export class SCCalendarComponent implements OnChanges {
  @Input() options: EventOptionEntity;
  eventOptions: EventOptionEntity = new EventOptionEntity();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.eventOptions = {
      ...this.eventOptions,
      ...this.options
    };
  }

  get title() {
    return moment(this.eventOptions.defaultDate).format(this.eventOptions.titleFormat);
  }

  dateChanged(when) {
    switch (when) {
      case 'prev':
        this.eventOptions = {
          ...this.eventOptions,
          ...{
            defaultDate: moment(this.eventOptions.defaultDate).subtract(1, 'day')
          }
        };
        break;
      case 'next':
        this.eventOptions = {
          ...this.eventOptions,
          ...{
            defaultDate: moment(this.eventOptions.defaultDate).add(1, 'day')
          }
        };
        break;
      case 'today':
        this.eventOptions = {
          ...this.eventOptions,
          ...{
            defaultDate: moment()
          }
        };
        break;
    }
  }
}
