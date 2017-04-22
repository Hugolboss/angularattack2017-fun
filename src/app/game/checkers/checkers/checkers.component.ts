import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CheckersService} from '../checkers.service';

@Component({
  selector: 'fun-checkers',
  templateUrl: './checkers.component.html',
  encapsulation: ViewEncapsulation.None,
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

  onClick ($state) {
    console.log(this.checkValidPiece($state.content));
  }

  checkValidPiece (val) {
    return (val === 'red' || val === 'black');
  }

}
