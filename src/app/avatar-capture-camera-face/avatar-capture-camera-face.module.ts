import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraFacePageRoutingModule } from './avatar-capture-camera-face-routing.module';

import { AvatarCaptureCameraFacePage } from './avatar-capture-camera-face.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarCaptureCameraFacePageRoutingModule
  ],
  declarations: [AvatarCaptureCameraFacePage]
})
export class AvatarCaptureCameraFacePageModule {
}
