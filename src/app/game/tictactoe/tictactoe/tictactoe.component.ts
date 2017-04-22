import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'fun-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.less']
})
export class TictactoeComponent implements OnInit {
  gameId;
  grid;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.grid = [
      [
        {active: true, state: {content: '0, 0'}},
        {active: false, state: {content: '0, 1'}},
        {active: false, state: {content: '0, 2'}},
      ],
      [
        {active: true, state: {content: '1, 0'}},
        {active: false, state: {content: '1, 1'}},
        {active: false, state: {content: '1, 2'}},
      ],
      [
        {active: true, state: {content: '2, 0'}},
        {active: false, state: {content: '2, 1'}},
        {active: false, state: {content: '2, 2'}},
      ]
    ];
    console.log(this.grid);
    this.route.params
      .subscribe((params: Params) => { this.gameId = params['id']; });
  }

}
