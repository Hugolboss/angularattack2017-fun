import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'fun-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit{
  @Output('onClick') click: EventEmitter<any> = new EventEmitter();
  @Output('onMouseOver') mouseOver: EventEmitter<any> = new EventEmitter();
  @Output('onMouseOut') mouseOut: EventEmitter<any> = new EventEmitter();
  @Input() grid: Object[][];
  @Input() x: number;
  @Input() y: number;

  constructor() {}
  ngOnInit() {}

  joinGrid() {
    return _.flatten(this.grid);
  }

  onClick(state, active) {
    if (!active) {
      this.click.emit(state);
    }
  }

  onMouseOver(cell) {
    this.mouseOver.emit(cell);
  }

  onMouseOut(cell) {
    this.mouseOut.emit(cell);
  }
}
