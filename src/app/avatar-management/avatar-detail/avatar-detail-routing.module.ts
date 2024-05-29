import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarDetailPage } from './avatar-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarDetailPageRoutingModule {}
