import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventDetailPage } from './event-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EventDetailPage
  },
  {
    path: 'event-update',
    loadChildren: () => import('../event-update/event-update.module').then( m => m.EventUpdatePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDetailPageRoutingModule {}
