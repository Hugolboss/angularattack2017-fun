import { Component, Input } from '@angular/core';

@Component({
  selector: 'fun-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class Cell {
  @Input() active: boolean;
  @Input() state: Object;

  constructor() {}
}
