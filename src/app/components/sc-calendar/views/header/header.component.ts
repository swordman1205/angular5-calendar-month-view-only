import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'sc-calendar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class SCCalendarHeaderComponent {
  @Input() title: string;
  @Input() month: string;
  @Output() dateChanged: EventEmitter<string> = new EventEmitter();

  @HostBinding('class') get monthCls() {
    return this.month;
  }

  constructor() {}
}
