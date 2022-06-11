import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CardAdvertisingComponent } from './card-advertising/card-advertising.component';
import { CardEventComponent } from './card-event/card-event.component';


/* En este modulo debemos declarar e importar los componentes*/
@NgModule({
  declarations: [
    CardAdvertisingComponent,
    CardEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ 
    CardAdvertisingComponent,
    CardEventComponent
  ]
})
export class ComponentsModule { }