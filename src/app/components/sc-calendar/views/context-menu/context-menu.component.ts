import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MatMenu } from '@angular/material';
import { ContextMenuItemEntity, EventEntity } from '../../entities';

@Component({
  selector: 'sc-calendar-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class SCCalendarContextMenuComponent implements OnInit, AfterViewInit {
  @Input() content: ContextMenuItemEntity[] = [];
  @Input() event: EventEntity;
  @Output() onLoadMenu: EventEmitter<MatMenu> = new EventEmitter();
  @ViewChild('contextMenu') contextMenu: MatMenu;
  @ViewChildren('menuRef') menuRefs: QueryList<MatMenu>;

  subMenuList: {name: string, items: ContextMenuItemEntity[], show?: boolean}[] = [];
  menuObj: any = {};

  loaded: boolean = false;

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.content.length; i++) {
      this.fetchSubMenuList(this.content[i]);
    }

    setTimeout(() => {
      this.menuRefs.forEach((item: MatMenu, index:number) => {
        this.menuObj[this.subMenuList[index].name] = item;
      });
      this.loaded = true;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.onLoadMenu.emit(this.contextMenu);
    });
  }

  fetchSubMenuList(menuItem: ContextMenuItemEntity): void {
    if (menuItem.children) {
      this.subMenuList.push({
        name: menuItem.title,
        items: menuItem.children
      });
      for (let i = 0; i < menuItem.children.length; i++) {
        this.fetchSubMenuList(menuItem.children[i]);
      }
    }
  }
}
