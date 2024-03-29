import { ModalAbsenceComponent } from './modals/modal-absence/modal-absence.component';
import { PopoverAnnouncementComponent } from './popovers/popover-announcement/popover-announcement.component';
import { CardInfoComponent } from './profile/card-info/card-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CardAdvertisingComponent } from './card-advertising/card-advertising.component';
import { CardEventComponent } from './card-event/card-event.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PopoverAssistComponent } from './popovers/popover-assist/popover-assist.component';
import { PopoverMenuComponent } from './popovers/popover-menu/popover-menu.component';
import { CardInfoteamComponent } from './card-infoteam/card-infoteam.component';
import { HeaderProfileComponent } from './profile/header-profile/header-profile.component';
import { DataComponent } from './profile/data/data.component';

/* En este modulo debemos declarar e importar los componentes*/
@NgModule({
  declarations: [
    CardAdvertisingComponent,
    CardInfoteamComponent,
    CardEventComponent,
    HeaderComponent,
    PopoverAssistComponent,
    PopoverMenuComponent,
    PopoverAnnouncementComponent,
    ModalAbsenceComponent,
    HeaderProfileComponent,
    CardInfoComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  exports:[ 
    CardAdvertisingComponent,
    CardInfoteamComponent,
    CardEventComponent,
    HeaderComponent,
    PopoverAssistComponent,
    PopoverMenuComponent,
    PopoverAnnouncementComponent,
    ModalAbsenceComponent,
    HeaderProfileComponent,
    CardInfoComponent,
    DataComponent
  ]
})
export class ComponentsModule { }