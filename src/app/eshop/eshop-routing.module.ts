import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EshopPage} from './eshop.page';
import {FittingRoomPage} from '../fitting-room/fitting-room.page';
import {AvatarPage} from "../avatar/avatar.page";

const routes: Routes = [
  {
    path: '',
    component: EshopPage
  },
  {
    path: 'fitting-room',
    component: FittingRoomPage
  },
  {
    path: 'avatar',
    component: AvatarPage
  },
  {
    path: 'detail-page',
    loadChildren: () => import('./detail-page/detail-page.module').then( m => m.DetailPagePageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EshopPageRoutingModule {
}
