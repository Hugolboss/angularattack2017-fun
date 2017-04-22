import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CheckersService} from '../checkers.service';

@Component({
  selector: 'fun-checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.less']
})
export class CheckersComponent implements OnInit {
 gameId;
  constructor(private route: ActivatedRoute, private checkersService: CheckersService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.checkersService.setGame(this.gameId);
    });
  }


}
