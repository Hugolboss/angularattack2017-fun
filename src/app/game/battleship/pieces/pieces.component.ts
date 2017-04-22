import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fun-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.less']
})
export class PiecesComponent implements OnInit {
  data;
  constructor() { }

  ngOnInit() {
    this.data = {
      horizontal: true,
      length: 3
    }
  }

}
