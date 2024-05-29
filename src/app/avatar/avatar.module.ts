import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AvatarPageRoutingModule} from './avatar-routing.module';

import {AvatarPage} from './avatar.page';
import {AvatarCaptureComponent} from "./avatar-capture/avatar-capture.component";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {
  AvatarCaptureFaceScanningComponent
} from "../avatar-capture-camera-face/avatar-capture-face-scanning/avatar-capture-face-scanning.component";
import {AvatarCaptureBodyScanningComponent} from "../avatar-capture-camera-body/avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import{AvatarCaptureEnteringDataComponent} from "./avatar-capture-entering-data/avatar-capture-entering-data.component";
import{AvatarCaptureBodyScanningSideComponent} from "../avatar-capture-camera-body-side/avatar-capture-bodyScanning/avatar-capture-body-scanning.component";
import{AvatarCaptureSideBodyScanningComponent} from "../avatar-capture-camera-sidebody/avatar-capture-bodyScanning/avatar-capture-body-scanning.component"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarPageRoutingModule,
    ReactiveFormsModule,
    // LazyLoadImageModule,
  ],
  declarations: [AvatarPage,AvatarCaptureEnteringDataComponent ,AvatarCaptureComponent, AvatarCaptureFaceScanningComponent, AvatarCaptureBodyScanningComponent, AvatarCaptureBodyScanningSideComponent, AvatarCaptureSideBodyScanningComponent
  ]
})
export class AvatarPageModule {
}
