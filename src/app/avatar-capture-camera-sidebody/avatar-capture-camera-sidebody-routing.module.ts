import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarCaptureCameraSidebodyPage } from './avatar-capture-camera-sidebody.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarCaptureCameraSidebodyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarCaptureCameraSidebodyPageRoutingModule {}
