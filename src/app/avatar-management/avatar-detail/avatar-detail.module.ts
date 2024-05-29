import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon'
import { IonicModule } from '@ionic/angular';
import { AvatarDetailPageRoutingModule } from './avatar-detail-routing.module';

import { AvatarDetailPage } from './avatar-detail.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarDetailPageRoutingModule,
    ScrollingModule,
  ],
  declarations: [AvatarDetailPage]
})
export class AvatarDetailPageModule {}
