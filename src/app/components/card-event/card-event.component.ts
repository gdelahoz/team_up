import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverAssistComponent } from '../popovers/popover-assist/popover-assist.component';

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

  constructor( private popoverCtrl: PopoverController ) { }

  ngOnInit() {}

  async openPopoverAssist( evento ){
    console.log('ABRIR POPOVER');

    const popover = await this.popoverCtrl.create({
      component: PopoverAssistComponent,
      event: evento, 
    });

    await popover.present();

  }

}
