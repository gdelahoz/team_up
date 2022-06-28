import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { calendarPage } from './calendar.page';

const routes: Routes = [
  {
    path: '',
    component: calendarPage,
  },
  {
    path: 'create-event',
    loadChildren: () => import('../create-event/create-event.module').then( m => m.CreateEventPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class calendarPageRoutingModule {}
