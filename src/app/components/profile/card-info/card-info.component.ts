import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})
export class CardInfoComponent implements OnInit {
  @Input() title: string;
  @Input() data1: string;
  @Input() data2: string;
  @Input() data3: string;
  @Input() data4: string;
  @Input() data5: string;
  @Input() datatitle1: string;
  @Input() datatitle2: string;
  @Input() datatitle3: string;
  @Input() datatitle4: string;
  @Input() datatitle5: string;
  
  constructor() { }

  ngOnInit() {}

}
