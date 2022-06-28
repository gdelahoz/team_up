import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAnnouncementsPageRoutingModule } from './create-announcements-routing.module';

import { CreateAnnouncementsPage } from './create-announcements.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CreateAnnouncementsPageRoutingModule
  ],
  declarations: [CreateAnnouncementsPage]
})
export class CreateAnnouncementsPageModule {}
