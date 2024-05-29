import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FittingRoomPageRoutingModule} from './fitting-room-routing.module';

import {FittingRoomPage} from './fitting-room.page';

import {FittingRoomItemComponent} from './components/fitting-room-item/fitting-room-item.component';

import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FittingRoomPageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [FittingRoomPage, FittingRoomItemComponent]
})
export class FittingRoomPageModule {
}
