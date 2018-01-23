import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'sc-calendar-event-chip',
  templateUrl: './event-chip.component.html',
  styleUrls: ['./event-chip.component.scss']
})
export class SCCalendarEventChipComponent implements OnInit {
  @Input('data') event: any;
  @Output('eventShown') eventShown: EventEmitter<any> = new EventEmitter();

  constructor(private $el: ElementRef) {}

  ngOnInit() {
    this.eventShown.next({
      event: this.event.raw,
      element: this.$el.nativeElement
    });
  }
}
