import {Component, OnInit, Input} from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'fun-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit{
  @Input() grid: Object[][];
  @Input() x: number;
  @Input() y: number;

  constructor() {}
  ngOnInit() {}

  joinGrid() {
    return _.flatten(this.grid);
  }
}
