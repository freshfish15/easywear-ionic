import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarCaptureEnteringDataPageRoutingModule } from './avatar-capture-entering-data-routing.module';

import { AvatarCaptureEnteringDataPage } from './avatar-capture-entering-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarCaptureEnteringDataPageRoutingModule
  ],
  declarations: [AvatarCaptureEnteringDataPage]
})
export class AvatarCaptureEnteringDataPageModule {}
