import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CardAdvertisingComponent } from './card-advertising/card-advertising.component';
import { CardEventComponent } from './card-event/card-event.component';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { HeaderComponent } from './header/header.component';


/* En este modulo debemos declarar e importar los componentes*/
@NgModule({
  declarations: [
    CardAdvertisingComponent,
    CardEventComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ 
    CardAdvertisingComponent,
    CardEventComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }