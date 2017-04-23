import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fun-stat-table',
  templateUrl: './stat-table.component.html',
  styleUrls: ['./stat-table.component.less']
})
export class StatTableComponent implements OnInit {
  @Input() stats;

  constructor() { }

  ngOnInit() {
  }

}
