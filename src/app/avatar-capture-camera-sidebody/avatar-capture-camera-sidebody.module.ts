import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraSidebodyPageRoutingModule } from './avatar-capture-camera-sidebody-routing.module';
import {AvatarCaptureCameraBodyPage} from "../avatar-capture-camera-body/avatar-capture-camera-body.page";
import { AvatarCaptureCameraSidebodyPage } from './avatar-capture-camera-sidebody.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarCaptureCameraSidebodyPageRoutingModule
  ],
  declarations: [AvatarCaptureCameraSidebodyPage]
})
export class AvatarCaptureCameraSidebodyPageModule {}
