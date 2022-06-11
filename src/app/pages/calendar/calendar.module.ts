import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { calendarPage } from './calendar.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { calendarPageRoutingModule } from './calendar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    calendarPageRoutingModule
  ],
  declarations: [calendarPage]
})
export class calendarPageModule {}
