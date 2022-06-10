import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CardAdvertisingComponent } from './card-advertising/card-advertising.component';


/* En este modulo debemos declarar e importar los componentes*/
@NgModule({
  declarations: [
    CardAdvertisingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[ 
    CardAdvertisingComponent,
  ]
})
export class ComponentsModule { }