import { EventEntity } from './event.entity';
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
  dayRender?: (date, cell) => void;
  eventRender?: (event, element) => void;
}
