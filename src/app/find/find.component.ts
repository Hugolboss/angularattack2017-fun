import { Component, OnInit, Input } from '@angular/core';
import { FindService } from './find.service';

@Component({
  selector: 'fun-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.less'],
  providers: [FindService]
})
export class FindComponent implements OnInit {
  @Input() game: string;
  games;

  constructor(private service: FindService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.games = this.service.findGames(this.game);
  }
}
