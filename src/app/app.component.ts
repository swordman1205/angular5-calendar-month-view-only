import { Component } from '@angular/core';
import { EventOptionEntity } from './components/sc-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: EventOptionEntity = {
    defaultDate: '2017-12-12',
    dayRender: (date, cell) => {
      // put some logic here for styling the day cells
    },
    eventRender: (event, element) => {
      // put some logic here for styling event chips
    },
    events: [
      {
        title: 'All Day Event',
        start: '2017-12-01'
      },
      {
        title: 'Long Event',
        start: '2017-12-07',
        end: '2017-12-10'
      },
      {
        title: 'Repeating Event',
        start: '2017-12-09T16:00:00'
      },
      {
        title: 'Repeating Event',
        start: '2017-12-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2017-12-11',
        end: '2017-12-13'
      },
      {
        title: 'Meeting',
        start: '2017-12-12T10:30:00',
        end: '2017-12-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2017-12-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2017-12-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2017-12-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2017-12-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2017-12-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2017-12-28'
      }
    ]
  };
}
