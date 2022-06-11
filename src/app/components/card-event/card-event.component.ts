import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss'],
})
export class CardEventComponent implements OnInit {
  @Input() title: string;
  @Input() date: string;
  @Input() place: string;
  @Input() time: string;
  @Input() players: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {}

}
