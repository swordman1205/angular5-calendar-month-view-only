import { CommonModule } from "@angular/common";
import { Popover } from "./Popover";
import { PopoverContent } from "./PopoverContent";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopoverContent,
    Popover,
  ],
  exports: [
    PopoverContent,
    Popover,
  ],
  entryComponents: [
    PopoverContent
  ]
})
export class PopoverModule {

}
