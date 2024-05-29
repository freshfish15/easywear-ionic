import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarCaptureCameraBodyPage } from './avatar-capture-camera-body.page';
import {AvatarPage} from "../avatar/avatar.page";
import {AvatarCaptureCameraBodySidePage} from "../avatar-capture-camera-body-side/avatar-capture-camera-body-side.page";
import {AvatarCaptureCameraSidebodyPage} from "../avatar-capture-camera-sidebody/avatar-capture-camera-sidebody.page";

const routes: Routes = [
  {
    path: '',
    component: AvatarCaptureCameraBodyPage
  },
  {
    path: 'avatar',
    component:AvatarPage
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
export class AvatarCaptureCameraBodyPageRoutingModule {}
