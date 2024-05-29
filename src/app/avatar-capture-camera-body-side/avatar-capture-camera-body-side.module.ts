import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraBodySidePageRoutingModule } from './avatar-capture-camera-body-side-routing.module';

import { AvatarCaptureCameraBodySidePage } from './avatar-capture-camera-body-side.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarCaptureCameraBodySidePageRoutingModule,
  ],
  declarations: [AvatarCaptureCameraBodySidePage]
})
export class AvatarCaptureCameraBodySidePageModule {}
