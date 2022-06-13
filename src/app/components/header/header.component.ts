import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';

@Component({
  selector: 'team-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() image: string;

  constructor( private popoverCtrl: PopoverController ) { }

  ngOnInit() {}

  async openPopoverMenu( evento ){
    console.log('avatar menu');

    const popover = await this.popoverCtrl.create({
      component: PopoverMenuComponent,
      event: evento, 
    });

    await popover.present();

  }

}
