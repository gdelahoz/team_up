import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CardAdvertisingComponent } from './card-advertising/card-advertising.component';
import { CardEventComponent } from './card-event/card-event.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PopoverAssistComponent } from './popover-assist/popover-assist.component';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';



/* En este modulo debemos declarar e importar los componentes*/
@NgModule({
  declarations: [
    CardAdvertisingComponent,
    CardEventComponent,
    HeaderComponent,
    PopoverAssistComponent,
    PopoverMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  exports:[ 
    CardAdvertisingComponent,
    CardEventComponent,
    HeaderComponent,
    PopoverAssistComponent,
    PopoverMenuComponent

  ]
})
export class ComponentsModule { }