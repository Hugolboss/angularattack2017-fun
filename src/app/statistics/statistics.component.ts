import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'fun-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})
export class StatisticsComponent implements OnInit {
  @Input() records;

  constructor(public dialogRef: MdDialogRef<StatisticsComponent>) { }

  ngOnInit() {
  }

}
