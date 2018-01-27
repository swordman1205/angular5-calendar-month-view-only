export class EventEntity {
  id?: string | number;
  title: string;
  icon?: string;
  allDay?: boolean;
  start: string;
  end?: string;
  url?: string;
  className?: any;
  editable?: boolean;
  startEditable?: boolean;
  durationEditable?: boolean;
  resourceEditable?: boolean;
  rendering?: 'background' | 'inverse-background';
  overlap?: boolean;
  constraint?: any;
  source?: any;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}
