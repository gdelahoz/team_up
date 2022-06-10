import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { calendarPage } from './calendar.page';

const routes: Routes = [
  {
    path: '',
    component: calendarPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class calendarPageRoutingModule {}
