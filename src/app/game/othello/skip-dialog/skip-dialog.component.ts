import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'fun-skip-dialog',
  templateUrl: './skip-dialog.component.html',
  styleUrls: ['./skip-dialog.component.less']
})
export class SkipDialogComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}
