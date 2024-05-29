import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AvatarPage} from './avatar.page';
import {AvatarCaptureCameraFacePage} from "../avatar-capture-camera-face/avatar-capture-camera-face.page";

const routes: Routes = [
  {
    path: '',
    component: AvatarPage
  },
  {
    path:'avatarCameraCaptureFace',
    component:AvatarCaptureCameraFacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarPageRoutingModule {
}
