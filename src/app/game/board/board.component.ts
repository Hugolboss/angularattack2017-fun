import {Component, OnInit} from '@angular/core';
import { CellComponent } from './cell.component';

@Component({
  selector: 'fun-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit{
  grid: CellComponent[][];
  x: number;
  y: number;

  constructor(grid: CellComponent[][], x: number, y: number) {
    this.grid = grid;
    this.x = x;
    this.y = y;
  }
  ngOnInit() {}
}
