import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { teamPage } from './team.page';

const routes: Routes = [
  {
    path: '',
    component: teamPage,
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class teamPageRoutingModule {}
