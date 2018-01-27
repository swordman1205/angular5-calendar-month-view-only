import { Component } from '@angular/core';
import { EventOptionEntity, ContextMenuItemEntity } from './components/sc-calendar';

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
        end: '2017-12-10',
        backgroundColor: '#ff4081',
        icon: 'warning'
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

  contextMenu: ContextMenuItemEntity[] = [
    {
      title: 'Open',
      icon: 'open_in_new',
      callback: (event) => {
        // put some logic here
      }
    },
    {
      title: 'Copy',
      icon: 'content_copy',
      callback: (event) => {
        // put some logic here
      }
    },
    {
      title: 'Edit',
      icon: 'mode_edit',
      callback: (event) => {
        // put some logic here
      }
    },
    {
      title: 'Status',
      icon: 'mode_edit',
      children: [
        {
          title: 'Default',
          callback: (event) => {
            // put some logic here
          }
        },
        {
          title: 'Completed',
          callback: (event) => {
            // put some logic here
          }
        },
        {
          title: 'Invoiced',
          callback: (event) => {
            // put some logic here
          }
        },
        {
          title: 'Paid',
          callback: (event) => {
            // put some logic here
          }
        },
        {
          title: 'Cancelled',
          callback: (event) => {
            // put some logic here
          }
        }
      ]
    },
    {
      title: 'Delete',
      icon: 'delete',
      callback: (event) => {
        const index = this.options.events.indexOf(event);
        if (index > -1) {
          this.options.events.splice(index, 1);
        }
      }
    }
  ];

}
