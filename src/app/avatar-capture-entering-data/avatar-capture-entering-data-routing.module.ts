import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarCaptureEnteringDataPage } from './avatar-capture-entering-data.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarCaptureEnteringDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarCaptureEnteringDataPageRoutingModule {}
