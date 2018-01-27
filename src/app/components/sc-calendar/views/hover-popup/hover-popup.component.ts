import { Component, Input } from '@angular/core';
import { EventEntity } from '../../entities';

@Component({
  selector: 'sc-calendar-hover-popup',
  templateUrl: './hover-popup.component.html',
  styleUrls: ['./hover-popup.component.scss']
})
export class SCCalendarHoverPopup {
  @Input() event: EventEntity;
}
