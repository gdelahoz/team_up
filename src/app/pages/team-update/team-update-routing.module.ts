import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamUpdatePage } from './team-update.page';

const routes: Routes = [
  {
    path: '',
    component: TeamUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamUpdatePageRoutingModule {}
