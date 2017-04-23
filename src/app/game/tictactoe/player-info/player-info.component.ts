import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'fun-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.less']
})
export class PlayerInfoComponent implements OnInit {
  @Input() players;
  @Input() currentPlayer;
  @Input() victor;
  @Input() images;
  @Input() me;
  @Input() state;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  backToLobby() {
    this.router.navigate(['/']);
  }

}
