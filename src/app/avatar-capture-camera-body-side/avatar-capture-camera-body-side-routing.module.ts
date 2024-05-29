import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AvatarCaptureCameraBodySidePage} from './avatar-capture-camera-body-side.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarCaptureCameraBodySidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarCaptureCameraBodySidePageRoutingModule {}
