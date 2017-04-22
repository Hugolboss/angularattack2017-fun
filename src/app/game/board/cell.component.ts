import { Component } from '@angular/core';

@Component({
  selector: 'fun-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class CellComponent {
  active: boolean;
  state: Object;

  constructor(active: boolean, state: Object) {
    this.active = active;
    this.state = state;
  }
}
