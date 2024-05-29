import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarCaptureCameraFacePage } from './avatar-capture-camera-face.page';
import {AvatarPage} from "../avatar/avatar.page";

const routes: Routes = [
  {
    path: '',
    component: AvatarCaptureCameraFacePage
  },
  {
    path: 'avatar',
    component:AvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarCaptureCameraFacePageRoutingModule {}
