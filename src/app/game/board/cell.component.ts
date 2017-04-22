import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import { CellState } from './cell-state';

@Component({
  selector: 'fun-cell',
  templateUrl: './cell.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cell.component.less']
})
export class CellComponent implements OnInit {

  @Input() active: boolean;
  @Input() state: CellState;

  constructor() {
  }
  ngOnInit() {}
}
