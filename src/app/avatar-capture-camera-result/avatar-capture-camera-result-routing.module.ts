import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarCaptureCameraResultPage } from './avatar-capture-camera-result.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarCaptureCameraResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarCaptureCameraResultPageRoutingModule {}
