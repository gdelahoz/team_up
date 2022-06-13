import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from 'src/app/components/popover-menu/popover-menu.component';

@Component({
  selector: 'app-team',
  templateUrl: 'team.page.html',
  styleUrls: ['team.page.scss']
})
export class teamPage implements OnInit{
  default = "players";

  @ViewChild(IonSegment) segment: IonSegment;

  constructor( private popoverCtrl: PopoverController ) {}

  ngOnInit(){
    //this.segment.value = "players";
  }

  segmentChanged( event ){

    this.default = event.detail.value;

    /*const valorSegment = event.detail.value;
    console.log(valorSegment);*/

  }

}
