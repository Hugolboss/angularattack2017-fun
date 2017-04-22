import {Component, OnInit, Input} from '@angular/core';
import { CellComponent } from './cell.component';

@Component({
  selector: 'fun-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit{
  @Input() grid: CellComponent[][];
  @Input() x: number;
  @Input() y: number;

  constructor() {}
  ngOnInit() {}
}
