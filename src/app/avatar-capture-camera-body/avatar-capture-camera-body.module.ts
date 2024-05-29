import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarCaptureCameraBodyPageRoutingModule } from './avatar-capture-camera-body-routing.module';

import { AvatarCaptureCameraBodyPage } from './avatar-capture-camera-body.page';
//import {AvatarCaptureCameraSidebodyPageModule} from '../avatar-capture-camera-sidebody/avatar-capture-camera-sidebody.modulebody.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarCaptureCameraBodyPageRoutingModule
  ],
  declarations: [AvatarCaptureCameraBodyPage]
})
export class AvatarCaptureCameraBodyPageModule {}
