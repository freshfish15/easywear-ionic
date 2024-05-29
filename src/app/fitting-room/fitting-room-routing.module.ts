import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {FittingRoomPage} from './fitting-room.page';
import {EshopPage} from '../eshop/eshop.page';

const routes: Routes = [
  {
    path: '',
    component: FittingRoomPage
  },
  {
    path: 'eshop',
    component: EshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),IonicModule],
  exports: [RouterModule],
})
export class FittingRoomPageRoutingModule {
}
