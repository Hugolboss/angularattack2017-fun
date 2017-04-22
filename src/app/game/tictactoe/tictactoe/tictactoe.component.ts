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
    this.grid = Array.of(Array(3), Array(3), Array(3));
    console.log(this.grid);
    this.route.params
      .subscribe((params: Params) => { this.gameId = params['id']; });
  }

}
