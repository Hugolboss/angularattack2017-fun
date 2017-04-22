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
  private grid;
  private currentContent: string = 'X';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.grid = [
      [
        {active: true, state: {content: '0, 0', x: 0, y: 0}},
        {active: false, state: {content: '0, 1', x: 1, y: 0}},
        {active: false, state: {content: '0, 2', x: 2, y: 0}},
      ],
      [
        {active: true, state: {content: '1, 0', x: 0, y: 1}},
        {active: false, state: {content: '1, 1', x: 1, y: 1}},
        {active: false, state: {content: '1, 2', x: 2, y: 1}},
      ],
      [
        {active: true, state: {content: '2, 0', x: 0, y: 2}},
        {active: false, state: {content: '2, 1', x: 1, y: 2}},
        {active: false, state: {content: '2, 2', x: 2, y: 2}},
      ]
    ];
    console.log(this.grid);
    this.route.params
      .subscribe((params: Params) => { this.gameId = params['id']; });
  }

  switchPlayer() {
    if (this.currentContent === 'X') {
      this.currentContent = 'O';
    } else {
      this.currentContent = 'X';
    }
  }

  onClick(state) {
    this.grid[state.y][state.x].state.content = this.currentContent;
    this.switchPlayer();
  }

}
