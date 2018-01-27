import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatMenuTrigger, MatMenu } from '@angular/material';

@Directive({
  selector: '[contextMenuTrigger]'
})
export class ContextMenuTriggerDirective extends MatMenuTrigger {
  @Input('contextMenuTrigger') menu: MatMenu;
  @Output() onContextMenuShown: EventEmitter<any> = new EventEmitter();

  @HostListener('contextmenu', ['$event'])
  _showMenu($event) {
    $event.preventDefault();
    this._handleClick($event);
    this.onContextMenuShown.emit();
  }

  @HostListener('click', ['$event'])
  _doNothing($event) {
    // silence is golden
  }
}
