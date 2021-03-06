import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { teamPage } from './team.page';

import { teamPageRoutingModule } from './team-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: teamPage }]),
    teamPageRoutingModule,
    ComponentsModule
  ],
  declarations: [teamPage]
})
export class teamPageModule {}
