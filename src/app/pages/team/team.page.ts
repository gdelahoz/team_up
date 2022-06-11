import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: 'team.page.html',
  styleUrls: ['team.page.scss']
})
export class teamPage implements OnInit{
  default = "players";

  @ViewChild(IonSegment) segment: IonSegment;

  constructor() {}

  ngOnInit(){
    //this.segment.value = "players";
  }

  segmentChanged( event ){

    this.default = event.detail.value;

    /*const valorSegment = event.detail.value;
    console.log(valorSegment);*/

  }

}
