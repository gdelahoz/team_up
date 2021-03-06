import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: homePage,
  },
  {
    path: 'create-announcements',
    loadChildren: () => import('../create-announcements/create-announcements.module').then( m => m.CreateAnnouncementsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class homePageRoutingModule {}
