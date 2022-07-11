import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  @Input() name: string;
  @Input() attendance: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {}

}
