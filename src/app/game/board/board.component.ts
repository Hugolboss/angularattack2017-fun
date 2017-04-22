import { Component } from '@angular/core';
import { Cell } from './cell.component';

@Component({
  selector: 'fun-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class Board {
  grid: Cell[][];
  x: number;
  y: number;

  constructor(grid: Cell[][], x: number, y: number) {
    this.grid = grid;
    this.x = x;
    this.y = y;
  }
}
