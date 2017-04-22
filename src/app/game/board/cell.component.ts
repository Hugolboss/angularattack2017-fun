import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fun-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class CellComponent implements OnInit {
  @Input() active: boolean;
  @Input() state: Object;

  constructor() {}
  ngOnInit() {}
}
