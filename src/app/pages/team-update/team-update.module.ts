import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamUpdatePageRoutingModule } from './team-update-routing.module';

import { TeamUpdatePage } from './team-update.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TeamUpdatePageRoutingModule
  ],
  declarations: [TeamUpdatePage]
})
export class TeamUpdatePageModule {}
