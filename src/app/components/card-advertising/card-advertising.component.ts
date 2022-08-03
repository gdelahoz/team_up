import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-card-advertising',
  templateUrl: './card-advertising.component.html',
  styleUrls: ['./card-advertising.component.scss'],
})
export class CardAdvertisingComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;
  @Input() rol?: string;
  
  constructor() { }

  ngOnInit() {}
}
