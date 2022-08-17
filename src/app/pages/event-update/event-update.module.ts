import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventUpdatePageRoutingModule } from './event-update-routing.module';

import { EventUpdatePage } from './event-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventUpdatePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EventUpdatePage]
})
export class EventUpdatePageModule {}
