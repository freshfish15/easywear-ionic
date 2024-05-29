import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarEditPageRoutingModule } from './avatar-edit-routing.module';

import { AvatarEditPage } from './avatar-edit.page';
import {CustomMaxlengthModule} from 'custom-maxlength';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarEditPageRoutingModule,
    CustomMaxlengthModule,
  ],
  declarations: [AvatarEditPage]
})
export class AvatarEditPageModule {}
