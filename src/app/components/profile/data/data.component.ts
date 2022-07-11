import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  @Input() title: string;
  @Input() data: string;
  
  constructor() { }

  ngOnInit() {}

}
