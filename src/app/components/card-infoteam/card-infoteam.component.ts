import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-card-infoteam',
  templateUrl: './card-infoteam.component.html',
  styleUrls: ['./card-infoteam.component.scss'],
})
export class CardInfoteamComponent implements OnInit {
  @Input() title: string;
  @Input() team: string;
  @Input() info: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {}

}
