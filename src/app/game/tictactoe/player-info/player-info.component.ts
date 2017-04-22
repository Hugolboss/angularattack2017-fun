import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fun-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.less']
})
export class PlayerInfoComponent implements OnInit {
  @Input() players;
  @Input() currentPlayer;
  constructor() { }

  ngOnInit() {
  }

}
