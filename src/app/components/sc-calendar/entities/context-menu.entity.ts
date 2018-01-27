import { EventEntity } from './event.entity';

export class ContextMenuItemEntity {
  title: string;
  icon?: string;
  children?: ContextMenuItemEntity[];
  callback?: (event?: EventEntity) => void;
}
