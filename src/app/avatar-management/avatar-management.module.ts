import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarManagementPageRoutingModule } from './avatar-management-routing.module';

import { AvatarManagementPage } from './avatar-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarManagementPageRoutingModule
  ],
  declarations: [AvatarManagementPage]
})
export class AvatarManagementPageModule {}
