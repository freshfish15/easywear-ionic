import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraResultPageRoutingModule } from './avatar-capture-camera-result-routing.module';

import { AvatarCaptureCameraResultPage } from './avatar-capture-camera-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarCaptureCameraResultPageRoutingModule
  ],
  declarations: [AvatarCaptureCameraResultPage]
})
export class AvatarCaptureCameraResultPageModule {}
