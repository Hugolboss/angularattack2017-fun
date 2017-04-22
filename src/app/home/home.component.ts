import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fun-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  game: string;
  constructor() { }

  ngOnInit() {
  }
  
  handleToggle(e, value) {
    console.log(e);
  }
}
