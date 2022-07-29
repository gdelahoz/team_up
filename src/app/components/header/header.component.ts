import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverMenuComponent } from '../popovers/popover-menu/popover-menu.component';

@Component({
  selector: 'team-toolbar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() image: string;
  @Input() hideProfilePhoto: boolean = false;

  constructor( private popoverCtrl: PopoverController ) { }

  ngOnInit() {}

  async openPopoverMenu( evento ){
    console.log('avatar menu');

    const popover = await this.popoverCtrl.create({
      component: PopoverMenuComponent,
      event: evento,
      dismissOnSelect: true
    });

    await popover.present();

  }

}
