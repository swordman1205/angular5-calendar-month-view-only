import { Directive, OnInit, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Directive({
  selector: '[contextMenuTrigger]'
})
export class ContextMenuTriggerDirective extends MatMenuTrigger {
  @Input('contextMenuTrigger') menu: any;

  @HostListener('contextmenu', ['$event'])
  _showMenu($event) {
    $event.preventDefault();
    this._handleClick($event);
  }

  @HostListener('click', ['$event'])
  _doNothing($event) {
    // silence is golden
  }
}
