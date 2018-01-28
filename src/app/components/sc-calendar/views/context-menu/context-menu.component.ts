import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatMenu } from '@angular/material';
import { ContextMenuItemEntity, EventEntity } from '../../entities';

@Component({
  selector: 'sc-calendar-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class SCCalendarContextMenuComponent implements OnInit {
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
    this.onLoadMenu.emit(this.contextMenu);

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
