import { EventEntity } from './event.entity';
import { Moment } from 'moment';
import * as moment from 'moment';

export class EventOptionEntity {
  monthNames?: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthNamesShort?: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dayNames?: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayNamesShort?: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  defaultView?: string = 'month';
  defaultDate?: string = moment().format('YYYY-MM-DD');
  titleFormat?: string = 'MMMM YYYY';
  events?: EventEntity[] = [];
  dayRender?: (date: Moment, cell: Element) => void;
  eventRender?: (event: EventEntity, element: Element) => void;
}
