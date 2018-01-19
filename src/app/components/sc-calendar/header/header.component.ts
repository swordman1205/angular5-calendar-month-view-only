import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sc-calendar-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class SCCalendarHeaderComponent {
  @Input() title: string;
  @Output() dateChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}
}
