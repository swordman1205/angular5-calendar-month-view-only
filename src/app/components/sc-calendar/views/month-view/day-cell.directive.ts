import { Directive, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[dayCell]'
})
export class DayCellDirective implements OnInit {
  @Input('dayCell') date: any;
  @Output() dayRender: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.dayRender.next({ date: this.date, cell: this.el.nativeElement })
  }
}
