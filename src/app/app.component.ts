import { Component } from '@angular/core';
import { EventOptionEntity } from './components/sc-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: EventOptionEntity = {
    titleFormat: 'MMMM D YYYY'
  };
}
